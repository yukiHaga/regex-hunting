class Api::V1::OauthsController < ApplicationController
  skip_before_action :require_login
  skip_before_action :verify_authenticity_token
  after_action :set_csrf_token_header

  # login_from・・・ユーザが外部認証済みでDBに登録されているか確認するメソッド
  # 登録されていればログインをしtrueを返却する。登録されていなければfalseを返す。
  # create_from・・・login_fromでfalseの場合にユーザ登録をするメソッド。
  # auto_login・・・メールアドレスやパスワードを使わずuserとしてログインする。
  # 主にユーザー作成後に、自動ログインさせたい場合に使う。
  def callback
    provider = params[:provider]
    if user = login_from(provider)
      render json: {
        session: true,
        user: User.handle_profile_user_serializer(user, user.avatar.attached? ? url_for(user.avatar) : nil)
      }, status: :ok
    else
      begin
        user = create_from(provider)
        reset_session
        auto_login(user)
        current_user.release_new_title(Title.find_by(name: current_user[:active_title])[:id])
        current_user.save!
        render json: {
          session: true,
          user: User.handle_profile_user_serializer(current_user, current_user.avatar.attached? ? url_for(current_user.avatar) : nil)
        }, status: :ok
      rescue StandardError
        render json: {
          session: false,
          user: {}
        }, status: :bad_request
      end
    end
  end
end
