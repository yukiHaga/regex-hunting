class Api::V1::RankingsController < ApplicationController
  skip_before_action :require_login, only: :index
  after_action :set_csrf_token_header, only: :index

  # 自分のランクを表示する部分は一旦保留。かなりムズイ
  def index
    top_ten_elementary = get_top_ten("elementary")
    top_ten_intermediate = get_top_ten("intermediate")
    top_ten_advanced = get_top_ten("advanced")
    render json: {
      top_ten_elementary: top_ten_elementary,
      top_ten_intermediate: top_ten_intermediate,
      top_ten_advanced: top_ten_advanced
    }, status: :ok
  end

  private

  # open_rankがtrueのユーザーidを全て取得する
  # そのidを外部キーにもつゲームデータを取得する
  # whereのハッシュのバリューに配列を指定すると、in句と同じ意味になる
  # orderは、デフォルトで昇順である
  # そのため、最も早いゲームデータがレコードの一番上にくる
  # to_aメソッドで、ActiveRecord_Relationクラスのオブジェクトを、
  # Arrayクラスのオブジェクトに変換する
  # 複数のゲームマネジメントに対して1人のユーザーが存在するので(N対1)
  # eager_loadで左外部結合をした。
  # ユーザー1人に対して、プロフィール画像が1つ存在しているので、
  # そのプロフィール画像もeager_loadで取得する
  # おかげで、1回のクエリで上位3つの速さのゲームデータ, ユーザー, 画像を取得できる
  def get_top_ten(difficulty)
    user_id = User.where(open_rank: true).pluck(:id)
    top_ten_array = GameManagement.where(
                                     difficulty: difficulty,
                                     game_result: :win,
                                     user_id: user_id
                                   ).order(:result_time).limit(10).
                                   eager_load(user: { avatar_attachment: :blob }).to_a.
                                   map do |game_management|
                                     {
                                       game_management: game_management,
                                       user: {
                                         name: game_management.user[:name],
                                         rank: game_management.user[:rank],
                                         active_title: game_management.user[:active_title],
                                         image: game_management.user.avatar.attached? ? url_for(game_management.user.avatar) : nil
                                       }
                                     }
                                   end
  end
end
