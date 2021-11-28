class Api::V1::UserSessionsController < ApplicationController
  skip_before_action :require_login, only: :create

  def create
    user = login(params[:email], params[:password])
    if user
      render json: {
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
    else
      render json: {errors: user.errors}, status: :not_found
    end
  end

  def destroy
    logout
    render json: {}, status: :ok
  end

  private

  def form_authenticity_token; end

end
