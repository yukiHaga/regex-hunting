class Api::V1::TitleSettingsController < ApplicationController
  after_action :set_csrf_token_header, only: :update

  def update
    if current_user.update(active_title: params[:select_title])
      render json: {
        session: true,
        user: {
          active_title: current_user[:active_title],
        }
      }, status: :ok
    else
      render json: {errors: current_user.errors}, status: :bad_request
    end
  end
end
