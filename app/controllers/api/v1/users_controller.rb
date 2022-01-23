class Api::V1::UsersController < ApplicationController
  skip_before_action :require_login, only: :create
  skip_before_action :verify_authenticity_token, only: :create
  after_action :set_csrf_token_header, only: :create

  # user.saveが成功したら、release_titlesのレコードも作る。
  def create
    user = User.new(user_params)
    raise ActiveRecord::RecordNotFound, user.errors.full_messages unless user.valid?
    if user.save
      reset_session
      auto_login(user)
      current_user.release_titles.build(
        release_date: Date.today,
        title_id: Title.find_by(name: current_user[:active_title])[:id]
      )
      current_user.save!
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
          image: nil
        }
      }, status: :created
    else
      render json: {errors: user.errors}, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
