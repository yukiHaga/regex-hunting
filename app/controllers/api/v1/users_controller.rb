class Api::V1::UsersController < ApplicationController
  skip_before_action :require_login, only: :create
  skip_before_action :verify_authenticity_token, only: :create
  after_action :set_csrf_token_header, only: :create
  before_action :set_user

  # user.saveが成功したら、release_titlesのレコードも作る。
  def create
    raise ActiveRecord::RecordNotFound, @user.errors.full_messages unless @user.valid?

    if @user.save
      reset_session
      auto_login(@user)
      current_user.release_new_title(Title.find_by(name: current_user[:active_title])[:id])
      current_user.save!
      render json: {
        session: true,
        user: User.handle_profile_user_serializer(current_user, current_user.avatar.attached? ? url_for(current_user.avatar) : nil)
      }, status: :created
    else
      render json: { errors: @user.errors }, status: :bad_request
    end
  end

  private

    def set_user
      @user = User.new(user_params)
    end

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
