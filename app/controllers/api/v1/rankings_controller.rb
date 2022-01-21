class Api::V1::RankingsController < ApplicationController
  before_action :set_each_difficulty_level_top_three, only: :index
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

  # orderは、デフォルトで昇順である
  # そのため、最も早いゲームデータがレコードの一番上にくる
  def get_top_three(difficulty)
    three_game_managements = GameManagement.where(
                                              difficulty: difficulty,
                                              game_result: :win
                                            ).order(:result_time).limit(3).
                                            eager_load(:user)
    top_three_array = three_game_managements.map do |obj|
                        {
                          game_management: obj,
                          user: game_management.user.select(
                                                       name,
                                                       rank,
                                                       active_title,
                                                     )
                        }
                      end
  end
end
