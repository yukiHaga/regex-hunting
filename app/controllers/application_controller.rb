class ApplicationController < ActionController::API
  include Api::ExceptionHandler
  include ActionController::RequestForgeryProtection
  include ActionController::Cookies
  include ActionController::MimeResponds
  protect_from_forgery with: :exception
  before_action :require_login

  private

  def not_authenticated
    render json: {
      alert: 'Please login first'
    }, status: :forbidden
  end

  # form_authenticity_tokenは、CSRF Tokenを生成するメソッド
  def set_csrf_token_header
    response.set_header('X-CSRF-Token', form_authenticity_token)
  end

  # React Routerを本番環境で動かすために必要なメソッド
  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
    end
  end
end
