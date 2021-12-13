class Api::V1::UserSessionsController < ApplicationController
  skip_before_action :require_login, only: :create
  skip_before_action :verify_authenticity_token, only: %i(create logged_in?)
  after_action :set_csrf_token_header, only: %i(create logged_in?)

  def create
    user = login(params[:email], params[:password])
    raise ActiveRecord::RecordNotFound unless user
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
    }, status: :ok
  end

  def destroy
    logout
    render json: {
      session: false,
      user: {}
    }, status: :ok
  end

  def logged_in?
    if current_user
      render json: {
        session: true,
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
      render json: {
        session: false,
        user: {}
      }, status: :ok
    end
  end

  private

  def form_authenticity_token; end

end
