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

  enum role: {
    general: 0,
    admin: 250
  }

  # 名前の最大文字数を12に変更した
  validates :name, presence: true, length: { maximum: 25 }

  # +の部分はgmail用
  REGEX_PATTERN = /\A[A-Za-z0-9][A-Za-z0-9_.-]*(\+[A-Za-z0-9_.-]+?)??@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+\z/
  validates :email, presence: true, format: { with: REGEX_PATTERN }
  validates :email, uniqueness: true
  validates :password, length: { minimum: 8 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  # DBより、rese_password_tokenの初期値はnilである為、
  # nilの時はバリデーションをスキップする
  validates :reset_password_token, uniqueness: true, allow_nil: true
  validates :open_rank, inclusion: [true, false]

  # avatarが存在するときだけこのバリデーションが走る
  # avatar画像に問題がないかチェックしている
  validate :avatar_type, :avatar_size, if: :avatar_attached?

  # プロフィールユーザー(プロフィールで使用するユーザー)をシリアライズするクラスメソッド
  # シリアライズ（serialize）とは、プログラミングでオプジェクト化されたデータを、
  # ファイルやストレージに保存したり、ネットワークで送受信したりできるような形に変換することである。
  # シリアライズ後のデータは、JSON形式になって、ネットワークを使って送受信できるようになる。
  # コントローラで使用する為、privateメソッドにしない
  # userデータをJSONに変換後、image: nilをマージしている
  def self.handle_profile_user_serializer(user, image)
    options = { serializer: UserSerializer, type: :profile }
    ActiveModelSerializers::SerializableResource.new(user, options)
                                                .as_json
                                                .merge({ image: image })
  end

  # ゲームユーザー(ゲーム中で使用するユーザー)をシリアライズするクラスメソッド
  # オプションのtypeを指定しないで呼び出すだけだと、rank, total, maxi, tempo, active_title
  # しかない為、mergeでprev_tempoを追加しとく
  def self.handle_game_user_serializer(user)
    options = { serializer: UserSerializer }
    ActiveModelSerializers::SerializableResource.new(user, options)
                                                .as_json
                                                .merge({ prev_temporary_experience: user[:temporary_experience] })
  end

  # ログインユーザーの新しいrelease_titleを作成する処理
  # ログインユーザー作成時とタイトル解放時に、この関数を実行する
  def release_new_title(title_id)
    release_titles.build(
      release_date: Time.zone.today,
      title_id: title_id
    )
  end

  # 今月の各日におけるゲーム回数
  # win, lose関係なしに取得する
  # play_dateをキー、頻度をバリューに持つハッシュが生成される
  # current_user省略してる
  def query_game_frequencies_per_day(this_month)
    game_managements.where(play_date: this_month)
                    .group(:play_date)
                    .count
  end

  # 今月の各難易度のプレイ時間
  # win, lose関係なしに取得する
  # SUM(result_time)は、difficultyのグループ毎に実施される
  # selectメソッド内に集約関数を入れた場合、.total_timeでその値を呼び出すことができる
  # selectメソッドの集約関数の結果は、ARオブジェクトにフィールドとして反映されないため、
  # 自分でオブジェクトを作る
  def query_total_time_per_difficulty(this_month)
    game_managements.where(play_date: this_month)
                    .group(:difficulty)
                    .select('difficulty, SUM(result_time) AS total_time')
                    .to_h do |data|
      [data.difficulty, data.total_time]
    end
  end

  # 今月の各難易度のゲームクリア回数
  # 難易度がキー、今月の難易度におけるクリア回数がバリューになる
  # キーバリューを3つ持つ1つのハッシュが作成される
  def query_game_clear_count_per_difficulty(this_month)
    game_managements.where(
      play_date: this_month,
      game_result: 'win'
    )
                    .group(:difficulty)
                    .select('difficulty, COUNT(*) AS total_count')
                    .to_h do |data|
      [data.difficulty, data.total_count]
    end
  end

  # 今月かつwinかつ各難易度の最速タイム
  def query_fast_time_per_difficulty(this_month)
    game_managements.where(
      play_date: this_month,
      game_result: 'win'
    )
                    .group(:difficulty)
                    .select('difficulty, MIN(result_time) AS fast_time')
                    .to_h do |data|
      [data.difficulty, data.fast_time]
    end
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
