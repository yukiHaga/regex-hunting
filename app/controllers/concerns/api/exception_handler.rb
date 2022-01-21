module Api::ExceptionHandler
  # モジュールを読み込んだときにインスタンスメソッドもクラスメソッドも両方読み込める。
  extend ActiveSupport::Concern

  # このブロック内にメソッドを定義しておくと、モジュールがincludeされたあとににそのメソッドが動作する。
  included do
    rescue_from StandardError, with: :render_500
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
  end

  private

  def render_400
    render json: {
      errors: {
        title: 'Bad Request',
        detail: 'リクエストが不正です。'
      }
    }, status: :bad_request
  end

  def render_404(e)
    if e.message.slice(/Email has already been taken/) == "Email has already been taken"
      render json: {
        errors: {
          title: 'Record Not Found',
          detail: 'このメールアドレスは既に登録されています。'
        }
      }, status: :not_found
    else
      render json: {
        errors: {
          title: 'Record Not Found',
          detail: 'メールアドレスもしくはパスワードが不正です。'
        }
      }, status: :not_found
    end
  end

  def render_500
    render json: {
      errors: {
        title: 'Internal Server Error',
        detail: 'メンテナンス中です。'
      }
    }, status: :internal_server_error
  end
end
