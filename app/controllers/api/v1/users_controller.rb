class Api::V1::UsersController < ApplicationController
  skip_before_action :require_login, only: :create
  skip_before_action :verify_authenticity_token, only: :create
  after_action :set_csrf_token_header, only: :create

  def create
    user = User.new(user_params)
    if user.save
      render json: {
        session: true,
        user: {
          name: user[:name],
          rank: user[:rank],
          total_experience: user[:total_experience],
          maximum_experience_per_rank: user[:maximum_experience_per_rank],
          temporary_experience: user[:temporary_experience],
          open_rank: user[:open_rank],
          active_title: user[:active_title],
          email: user[:email]
        }
      }, status: :created
    else
      render json: {errors: user.errors}, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
