class Api::V1::UserSessionsController < ApplicationController
  def create
    user = login(params[:email], params[:password])
    if user
      render json: {user: user}, status: :ok
    else
      render json: {errors: user.errors}, status: :bad_request
    end
  end

  def destroy
    logout
    render json: {}, status: :ok
  end
end
