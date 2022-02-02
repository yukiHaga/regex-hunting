class Api::V1::TitleSettingsController < ApplicationController
  after_action :set_csrf_token_header, only: :update

  CONDITION_HASH = {
    見習いハンター: 1,
    一人前ハンター: 2,
    玄人ハンター: 4,
    いにしえのハンター: 6,
    天才と呼ばれしハンター: 8,
    伝説のハンター: 10,
    無我の境地: 12,
    語り継がれし英雄: 14
  }

  def update
    if current_user[:rank] >= CONDITION_HASH[params[:select_title].to_sym] && current_user.update(active_title: params[:select_title])
      render json: {
        session: true,
        user: {
          active_title: current_user[:active_title],
        }
      }, status: :ok
    else
      render json: {
        errors: {
          display: true,
          message: "称号の変更に失敗しました。"
        }
      }, status: :bad_request
    end
  end
end
