class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :require_login

  private

  def not_authenticated
    render json: {
      alert: "Please login first"
    }, status: :forbidden
  end
end
