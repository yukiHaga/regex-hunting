class Api::V1::AccountSettingsController < ApplicationController
  after_action :set_csrf_token_header, only: :update

  # ActiveStorage::Blob.create_after_upload!は、サービスにioがアップロード
  # された後、保存されたblobインスタンスを返します
  # 最初にblobが構築され、次にioがアップロードされる。その後、blobが保存される
  # attachは、アタッチメントをレコードに紐づけるメソッド
  # 保存されるタイミングが2パターンあってどちらの挙動を取るか不明なので、
  # 最終的にcurrent_userをsaveする
  # StringIOは文字列をファイルのように扱うことができます
  # ユーザーは一つの画像しか持てないので、画像を更新するときはpurgeで
  # 元々設定している画像を消す
  def update
    if current_user.update(user_params)
      if params[:user][:image]
        current_user.avatar.purge
        blob = ActiveStorage::Blob.create_after_upload!(
          io: StringIO.new(decode(params[:user][:image][:data]) + "\n"),
          filename: params[:user][:image][:name]
        )
        current_user.avatar.attach(blob)
      end
      current_user.save!
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
          image: user.avatar.attached? ? url_for(user.avatar) : nil
        }
      }, status: :ok
    else
      render json: {errors: current_user.errors}, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :open_rank)
  end

  # フロント送られるData urlには、
  # 先頭にファイル属性などの文字列が付いているので、
  # カンマでスプリットしてデータ部分のみを取り出す
  # そして、エンコードされたデータをデコードする
  def decode(str)
    Base64.decode64(str.split(',').last)
  end
end
