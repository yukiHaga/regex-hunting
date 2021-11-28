class Api::V1::AccountSettingsController < ApplicationController
  def update
    if current_user.update(user_params)
      render json: {
        user: {
          name: current_user[:name],
          rank: current_user[:rank],
          total_experience: current_user[:total_experience],
          maximum_experience_per_rank: current_user[:maximum_experience_per_rank],
          temporary_experience: current_user[:temporary_experience],
          open_rank: current_user[:open_rank],
          active_title: current_user[:active_title],
          email: current_user[:email]
        }
      }, status: :ok
    else
      render json: {errors: current_user.errors}, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :open_rank)
  end
end
