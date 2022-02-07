class User < ApplicationRecord
  authenticates_with_sorcery!
  class << self; undef :open; end
  has_many :authentications, dependent: :destroy
  has_many :game_managements, dependent: :destroy
  has_many :release_titles, dependent: :destroy
  has_many :has_titles, through: :release_titles, source: :title
  accepts_nested_attributes_for :authentications

  has_one_attached :avatar

  enum active_title: {
    見習いハンター: 0,
    一人前ハンター: 1,
    玄人ハンター: 2,
    いにしえのハンター: 3,
    天才と呼ばれしハンター: 4,
    伝説のハンター: 5,
    無我の境地: 6,
    語り継がれし英雄: 7
  }

  validates :name, presence: true, length: { maximum: 10 }

  REGEX_PATTERN = /\A[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}\z/
  validates :email, presence: true, format: { with: REGEX_PATTERN }
  validates :email, uniqueness: true
  validates :password, length: { minimum: 8 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  # DBより、rese_password_tokenの初期値はnilなので、
  # nilの時はバリデーションをスキップする
  validates :reset_password_token, uniqueness: true, allow_nil: true
  validates :open_rank, inclusion: [true, false]

  # avatarが存在するときだけこのバリデーションが走る
  # avatar画像に問題がないかチェックしている
  validate :avatar_type, :avatar_size, if: :avatar_attached?

  # プロフィールユーザー(プロフィールで使うユーザー)をシリアライズするクラスメソッド
  # シリアライズ（serialize）とは、プログラミングでオプジェクト化されたデータを、
  # ファイルやストレージに保存したり、ネットワークで送受信したりできるような形に変換することである。
  # シリアライズ後のデータは、JSON形式になって、ネットワークを使って送受信できるようになる。
  # コントローラで使うので、privateメソッドにしない
  # userデータをJSONに変換後、image: nilをマージしている
  def self.handle_profile_user_serializer(user, image)
    options = { serializer: UserSerializer, type: :profile }
    ActiveModelSerializers::SerializableResource.new(user, options)
                                                .as_json
                                                .merge({ image: image })
  end

  # ゲームユーザー(ゲーム中で使うユーザー)をシリアライズするクラスメソッド
  # オプションのtypeを指定しないで呼び出すだけだと、rank, total, maxi, tempo, active_title
  # しかないので、mergeでprev_tempoを追加しとく
  def self.handle_game_user_serializer(user)
    options = { serializer: UserSerializer }
    ActiveModelSerializers::SerializableResource.new(user, options)
                                                .as_json
                                                .merge({ prev_temporary_experience: user[:temporary_experience]})
  end

  private

    # in?に含まれていればtrueになる。含まれているのが正常
    def avatar_type
      unless avatar.blob.content_type.in?(%('image/jpg image/jpeg image/png'))
        avatar.purge
        errors.add(:avatar, 'jpegまたはpng形式でアップロードしてください')
      end
    end

    def avatar_size
      if avatar.blob.byte_size > 1.megabytes
        avatar.purge
        errors.add(:avatar, '1MB以内のファイルを選択してください')
      end
    end

    # avatar画像が存在するかを返すメソッド
    # attached?でアバターが存在するかを判定できる
    def avatar_attached?
      avatar.attached?
    end
end
