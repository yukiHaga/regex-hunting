class Api::V1::UserSessionsController < ApplicationController
  skip_before_action :require_login, only: %i[create current_user_logged_in? destroy]
  skip_before_action :verify_authenticity_token, only: %i[create current_user_logged_in?]
  after_action :set_csrf_token_header, only: %i[create current_user_logged_in?]

  def create
    user = login(params[:email], params[:password])
    raise ActiveRecord::RecordNotFound unless user

    render json: {
      session: true,
      user: User.handle_profile_user_serializer(user, user.avatar.attached? ? url_for(user.avatar) : nil)
    }, status: :ok
  end

  def destroy
    logout
    render json: {
      session: false,
      user: {}
    }, status: :ok
  end

  def current_user_logged_in?
    if current_user
      render json: {
        session: true,
        user: User.handle_profile_user_serializer(current_user, current_user.avatar.attached? ? url_for(current_user.avatar) : nil)
      }, status: :ok
    else
      render json: {
        session: false,
        user: {}
      }, status: :ok
    end
  end
end
