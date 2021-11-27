class Api::V1::TitleSettingsController < ApplicationController
  def update
    current_user.update!(active_title: params[:user][:select_title])
    render json: {
      user: current_user
    }, status: :ok
  end
end
