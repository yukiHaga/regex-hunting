class Api::V1::OauthsController < ApplicationController
  skip_before_action :require_login
  skip_before_action :verify_authenticity_token
  after_action :set_csrf_token_header

  # login_from・・・ユーザが外部認証済みでDBに登録されているか確認するメソッド
  # 登録されていればログインをしtrueを返却する。登録されていなければfalseを返す。
  # create_from・・・login_fromでfalseの場合にユーザ登録をするメソッド。
  # auto_login・・・メールアドレスやパスワードを使わずuserとしてログインする。
  # 主にユーザー作成後に、自動ログインさせたい時に使う。
  def callback
    provider = params[:provider]
    if user = login_from(provider)
      render json: {
        session: true,
        user: {
          id: user[:id],
          name: user[:name],
          rank: user[:rank],
          total_experience: user[:total_experience],
          maximum_experience_per_rank: user[:maximum_experience_per_rank],
          temporary_experience: user[:temporary_experience],
          open_rank: user[:open_rank],
          active_title: user[:active_title],
          email: user[:email],
          image: nil
        }
      }, status: :ok
    else
      begin
        user = create_from(provider)
        reset_session
        auto_login(user)
        current_user.release_titles.build(
          release_date: Time.zone.today,
          title_id: Title.find_by(name: current_user[:active_title])[:id]
        )
        current_user.save!
        render json: {
          session: true,
          user: {
            id: user[:id],
            name: user[:name],
            rank: user[:rank],
            total_experience: user[:total_experience],
            maximum_experience_per_rank: user[:maximum_experience_per_rank],
            temporary_experience: user[:temporary_experience],
            open_rank: user[:open_rank],
            active_title: user[:active_title],
            email: user[:email],
            image: nil
          }
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
