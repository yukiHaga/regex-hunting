class Api::V1::PasswordResetsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    user&.deliver_reset_password_instructions!
    render json: {}, status: :ok
  end

  def edit
    token = params[:id]
    user = User.load_from_reset_password_token(token)
    not_authenticated if user.blank?
    render json: {}, status: :ok
  end

  def update
    token = params[:id]
    user = User.load_from_reset_password_token(token)

    return not_authenticated if user.blank?

    user.password_confirmation = params[:user][:password_confirmation]
    if user.change_password(params[:user][:password])
      render json: {}, status: :ok
    else
      render json: {}, status: :ok
    end
  end
end
