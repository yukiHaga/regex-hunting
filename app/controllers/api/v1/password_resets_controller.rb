class Api::V1::PasswordResetsController < ApplicationController
  skip_before_action :require_login
  skip_before_action :verify_authenticity_token, only: :create
  after_action :set_csrf_token_header, only: %i(create edit update)

  # ユーザーがパスワードリセットフォームにemailを入力して、
  # 送信を押すと、createアクションが実行される
  # deliver_reset_password_instructions!は、
  # パスワードをリセットする方法（ランダムなトークンを含むURL）を記載したメールを
  # ユーザーに送信します
  # おそらく、このメソッド実行の中で、有効期限付きのトークンを生成して、
  # UserMailerのreset_password_emailが実行される
  # そのため、メールが送られる
  def create
    @user = User.find_by(email: params[:email])
    @user&.deliver_reset_password_instructions!
    render json: {}, status: :ok
  end

  # リセットパスワードフォームを開くときに、editアクションが実行される
  # load_from_reset_password_tokenは、トークンでユーザーを検索して、
  # トークンの有効期限もチェックする
  # トークンが見つかり、かつ有効であればユーザーを返す。
  def edit
    token = params[:id]
    user = User.load_from_reset_password_token(token)
    not_authenticated if user.blank?
    render json: {}, status: :ok
  end

  # editアクションの結果を反映したリセットパスワードフォームを送信したとき、
  # updateアクションが実行される
  # change_passwordでは、一時的なトークンをクリアして、パスワードの更新を行う
  # このときに更新処理をするので、バリデーションが走る
  def update
    token = params[:id]
    user = User.load_from_reset_password_token(token)

    return not_authenticated if user.blank?

    user.password_confirmation = params[:user][:password_confirmation]
    if user.change_password(params[:user][:password])
      render json: {}, status: :ok
    else
      render json: {errors: user.errors}, status: :bad_request
    end
  end
end
