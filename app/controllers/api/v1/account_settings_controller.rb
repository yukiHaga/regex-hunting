class Api::V1::AccountSettingsController < ApplicationController
  after_action :set_csrf_token_header, only: :update

  # ActiveStorage::Blob.create_after_upload!は、サービスにioがアップロード
  # された後、保存されたblobインスタンスを返します
  # 最初にblobが構築され、次にioがアップロードされる。その後、blobが保存される
  # attachは、アタッチメントをレコードに紐づけるメソッド
  # 保存されるタイミングが2パターンあってどちらの挙動を取るか不明な為、
  # 最終的にcurrent_userをsaveする
  # StringIOは文字列をファイルのように扱うことができます
  # ユーザーは一つの画像しか持てない為、画像を更新するときはpurgeで
  # 元々設定している画像を消す
  # current_user.save!の場合、独自バリデーションを画像ファイルに走らせる
  # 画像を何も設定してないで、更新ボタンを押すと、params[:image].has_key?(:data)がfalseになる
  # 元々画像を設定していて、画像設定ボタンを押さないで更新ボタンを押すと、
  # params[:image].has_key?(:data)がfalseになる
  def update
    set_blob(params[:image], current_user)
    if current_user.update(user_params)
      render json: {
        session: true,
        user: User.handle_profile_user_serializer(current_user, current_user.avatar.attached? ? url_for(current_user.avatar) : nil)
      }, status: :ok
    else
      render json: {
        errors: {
          title: 'Bad Request',
          detail: current_user.errors.full_messages[0].split(' ').last
        }
      }, status: :bad_request
    end
  end

  # privateの下のメソッドにわざわざインデントを加えなくてもいい
  # しかし、rubocopで引っかかるため、インデント入れた
  private

    def set_blob(image, user)
      return unless image.has_key?(:data)

      user.avatar.purge
      blob = ActiveStorage::Blob.create_after_upload!(
        io: StringIO.new(decode(image[:data]) + "\n"),
        filename: image[:name]
      )
      user.avatar.attach(blob)
    end

    def user_params
      params.require(:user).permit(:name, :email, :open_rank)
    end

    # フロント送られるData urlには、
    # 先頭にファイル属性などの文字列が付いている為、
    # カンマでスプリットしてデータ部分のみを取り出す
    # そして、エンコードされたデータをデコードする
    def decode(str)
      Base64.decode64(str.split(',').last)
    end
end
