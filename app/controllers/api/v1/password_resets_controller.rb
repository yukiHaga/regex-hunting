class Api::V1::PasswordResetsController < ApplicationController
  skip_before_action :require_login
  skip_before_action :verify_authenticity_token
  after_action :set_csrf_token_header

  # ユーザーがパスワードリセットフォームにemailを入力して、
  # 送信を押すと、createアクションが実行される
  # deliver_reset_password_instructions!は、
  # パスワードをリセットする方法（ランダムなトークンを含むURL）を記載したメールを
  # ユーザーに送信します
  # おそらく、このメソッド実行の中で、有効期限付きのトークンを生成して、
  # UserMailerのreset_password_emailが実行される
  # そのため、メールが送られる
  # SPAだとdeliver_reset_password_instructions!でなぜかメールが送られなかったので、
  # generate_reset_password_token!で期限付きトークンを作成して、直接メイラーのメソッドを呼び出す
  # generate_reset_password_token!でusersテーブルのreset_password_tokenにトークンが入る
  def create
    user = User.find_by(email: params[:email])
    user&.generate_reset_password_token!
    UserMailer.reset_password_email(user).deliver_now
    head :ok
  end

  # load_from_reset_password_tokenは、トークンでユーザーを検索して、
  # トークンの有効期限もチェックする
  # トークンが見つかり、かつ有効であればユーザーを返す。
  # editアクションの結果を反映したリセットパスワードフォームを送信したとき、
  # updateアクションが実行される
  # change_passwordでは、一時的なトークンをクリアして、パスワードの更新を行う
  # このときに更新処理をするので、バリデーションが走る
  def update
    user = User.load_from_reset_password_token(params[:token])
    raise ActiveRecord::RecordNotFound unless user
    user.password_confirmation = params[:user][:password_confirmation]
    if user.change_password(params[:user][:password])
      head :ok
    else
      render json: {errors: user.errors}, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
