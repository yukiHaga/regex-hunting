module Api::ExceptionHandler
  # モジュールを読み込んだときにインスタンスメソッドもクラスメソッドも両方読み込める。
  extend ActiveSupport::Concern

  # このブロック内にメソッドを定義しておくと、モジュールがincludeされたあとににそのメソッドが動作する。
  included do
    rescue_from StandardError, with: :render_500
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
    rescue_from Not Acceptable, with: :render_406
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

  def render_404
    render json: {
      errors: {
        title: 'Record Not Found',
        detail: 'メールアドレスもしくはパスワードが不正です。'
      }
    }, status: :not_found
  end

  def render_406
    binding.pry
    render json: {
      errors: {
        title: 'Not Acceptable',
        detail: 'メールアドレスもしくはパスワードが不正です。'
      }
    }, status: :not_acceptable
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
