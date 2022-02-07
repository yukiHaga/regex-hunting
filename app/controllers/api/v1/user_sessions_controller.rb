class Api::V1::UserSessionsController < ApplicationController
  skip_before_action :require_login, only: %i[create current_user_logged_in? destroy]
  skip_before_action :verify_authenticity_token, only: %i[create current_user_logged_in?]
  after_action :set_csrf_token_header, only: %i[create current_user_logged_in?]

  def create
    user = login(params[:email], params[:password])
    raise ActiveRecord::RecordNotFound unless user

    render json: {
      session: true,
      user: {
        id: user[:id],
        name: user[:name],
        rank: user[:rank],
        total_experience: user[:total_experience],
        maximum_experience_per_rank: user[:maximum_experience_per_rank],
        temporary_experience: user[:temporary_experience],
        open_rank: user[:open_rank],
        active_title: user[:active_title],
        email: user[:email],
        image: user.avatar.attached? ? url_for(user.avatar) : nil
      }
    }, status: :ok
  end

  def destroy
    logout
    render json: {
      session: false,
      user: {}
    }, status: :ok
  end

  def current_user_logged_in?
    if current_user
      render json: {
        session: true,
        user: {
          id: current_user[:id],
          name: current_user[:name],
          rank: current_user[:rank],
          total_experience: current_user[:total_experience],
          maximum_experience_per_rank: current_user[:maximum_experience_per_rank],
          temporary_experience: current_user[:temporary_experience],
          open_rank: current_user[:open_rank],
          active_title: current_user[:active_title],
          email: current_user[:email],
          image: current_user.avatar.attached? ? url_for(current_user.avatar) : nil
        }
      }, status: :ok
    else
      render json: {
        session: false,
        user: {}
      }, status: :ok
    end
  end
end
