class Api::V1::OauthsController < ApplicationController
  skip_before_action :require_login
  skip_before_action :verify_authenticity_token
  after_action :set_csrf_token_header

  # login_from・・・ユーザが外部認証済みでDBに登録されているか確認するメソッド
  # 登録されていればログインをしtrueを返却する。登録されていなければfalseを返す。
  # create_from・・・login_fromでfalseの場合にユーザ登録をするメソッド。
  # auto_login・・・メールアドレスやパスワードを使わずuserとしてログインする。
  # 主にユーザー作成後に、自動ログインさせたい場合に使用する。
  def callback
    provider = params[:provider]

    # ログ1
    logger.debug "①providerの値: #{provider}"
    if user = login_from(provider)
     # ログ2
      logger.debug "②if文true時のuser: #{user&.inspect}"
      render json: {
        session: true,
        user: User.handle_profile_user_serializer(user, user.avatar.attached? ? url_for(user.avatar) : nil)
      }, status: :ok
    else
      begin
        user = create_from(provider)

        # ログ3
        logger.debug "③if文false時のuser: #{user&.inspect}"
        reset_session
        auto_login(user)

        # ログ4 current_user
        logger.debug "④if文false時のcurrent_userの値: #{current_user&.inspect}"
        current_user.release_new_title(Title.find_by(name: current_user[:active_title])[:id])

        # ログ5
        logger.debug "⑤if文false時のcurrent_user.release_titlesの値: #{current_user&.release_titles&.inspect}"
        current_user.save!
        render json: {
          session: true,
          user: User.handle_profile_user_serializer(current_user, current_user.avatar.attached? ? url_for(current_user.avatar) : nil)
        }, status: :ok
      rescue StandardError => e
        # ログ6
        logger.debug '⑥begin内でエラーが出たので、rescue節にいます'
        # ログ7
        logger.debug "⑦エラー, #{e}"

        render json: {
          session: false,
          user: {}
        }, status: :bad_request
      end
    end
  end
end
