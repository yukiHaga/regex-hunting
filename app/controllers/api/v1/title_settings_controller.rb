class Api::V1::TitleSettingsController < ApplicationController
  def update
    if current_user.update(active_title: params[:user][:select_title])
      render json: {
        user: current_user
      }, status: :ok
    else
      render json: {
        errors: current_user.erros
      }, status: :bad_request
    end
  end
end
