class Api::V1::AccountSettingsController < ApplicationController
  def update
    if current_user.update(user_params)
      render json: {
        user: current_user
      }, status: :ok
    else
      render json: {
        errors: current_user.erros
      }, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :pulic_rank)
  end
end
