class Api::V1::TitleSettingsController < ApplicationController
  after_action :set_csrf_token_header, only: :update

  def update
    if has_title? && current_user.update(active_title: params[:select_title])
      render json: {
        session: true,
        user: {
          active_title: current_user[:active_title]
        }
      }, status: :ok
    else
      render json: {
        errors: {
          display: true,
          message: '称号の変更に失敗しました。'
        }
      }, status: :bad_request
    end
  end

  private

    def has_title?
      current_user[:rank] >= Settings.TITLE_CONDITION_HASH.to_h[params[:select_title].to_sym]
    end
end
