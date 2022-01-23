class Api::V1::RankingsController < ApplicationController
  skip_before_action :require_login, only: :index
  after_action :set_csrf_token_header, only: :index

  # 自分のランクを表示する部分は一旦保留。かなりムズイ
  def index
    top_three_elementary = get_top_three("elementary")
    top_three_intermediate = get_top_three("intermediate")
    top_three_advanced = get_top_three("advanced")
    render json: {
      top_three_elementary: top_three_elementary,
      top_three_intermediate: top_three_intermediate,
      top_three_advanced: top_three_advanced
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
  # おかげで、1回のクエリで上位3つの速さのゲームデータとユーザーを取得できた
  def get_top_three(difficulty)
    user_id = User.where(open_rank: true).pluck(:id)
    three_game_managements = GameManagement.where(
                                              difficulty: difficulty,
                                              game_result: :win,
                                              user_id: user_id
                                            ).order(:result_time).limit(10).
                                            eager_load(:user)
    top_three_array = three_game_managements.to_a.map do |game_management|
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
