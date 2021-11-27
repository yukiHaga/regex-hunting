class Api::V1::RankingsController < ApplicationController
  before_action :set_each_difficulty_level_top_three, only: :index

  # 自分のランクを表示する部分は一旦保留。かなりムズイ
  def index
    render json: {
      top_three_elementary: @top_three_elementary,
      top_three_intermediate: @top_three_intermediate,
      top_three_advanced: @top_three_advanced
    }, status: :ok
  end

  private

  def set_each_difficulty_level_top_three
    @top_three_elementary = get_top_three("初級")
    @top_three_intermediate = get_top_three("中級")
    @top_three_advanced = get_top_three("上級")
  end

  def get_top_three(difficulty_level)
    fastest_result_time = GameManagement.where(difficulty_level: difficulty_level).minimum(:result_time)
    top_three_game_managements = GameManagement.where(difficulty_level: difficulty_level,
                                                      result_time: fastest_result_time..
                                                     ).
                                                limit(3)
    top_three_game_managements.map do |game_management|
      user = game_management.user
      {
        name: user[:name],
        rank: user[:rank],
        active_title: user[:active_title],
        result_time: user[:result_time]
      }
    end
  end
end
