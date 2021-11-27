class Api::V1::AccountSettingsController < ApplicationController
  def update
    current_user.update!(user_params)
    render json: {}, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :pulic_rank)
  end
end
