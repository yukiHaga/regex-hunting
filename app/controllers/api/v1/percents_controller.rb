class Api::V1::PercentsController < ApplicationController
  def get_correct_percents
    # 検索期間が決定したら、このアクションが呼び出される
    # 検索期間に応じた初級, 中級, 上級のゲーム管理データを取得
    beginning_day = params[:search_term][:beginning_day]
    last_day = params[:search_term][:last_day]
    this_month = beginning_day..last_day
    game_managements_per_month = current_user.game_managements.where(play_date: this_month, game_result: :win)

    # 取得した全てのゲーム管理データ対して、正答率を計算する
    temporary_elementary_correct_percents_per_month = []
    temporary_intermediate_correct_percents_per_month = []
    temporary_advanced_correct_percents_per_month = []

    game_managements_per_month.each do |game_management|
      correct = game_management.solved_questions.where(judgement: :correct)
      incorrect = game_management.solved_questions.where(judgement: :incorrect)
      correct_percent = (correct / (correct + incorrect)) * 100
      play_date = game_management[:play_date]
      difficulty_level = game_management[:difficulty_level]
      case difficulty_level
      when '初級'
        temporary_elementary_correct_percents_per_month << {play_date: play_date,
                                                            difficulty_level: difficulty_level,
                                                            correct_percent: correct_percent}
      when '中級'
        temporary_intermediate_correct_percents_per_month << {play_date: play_date,
                                                              difficulty_level: difficulty_level,
                                                              correct_percent: correct_percent}
      when '上級'
        temporary_advanced_correct_percents_per_month << {play_date: play_date,
                                                          difficulty_level: difficulty_level,
                                                          correct_percent: correct_percent}
      end
    end

    # 各日付における初級の最大正答率を導く処理
    elementary_correct_percents_per_month = uniq_correct_percents(temporary_elementary_correct_percents_per_month)

    # 各日付における中級の最大正答率を導く処理
    intermediate_correct_percents_per_month = uniq_correct_percents(temporary_intermediate_correct_percents_per_month)

    # 各日付における上級の最大正答率を導く処理
    advanced_correct_percents_per_month = uniq_correct_percents(temporary_advanced_correct_percents_per_month)

    # レンダリング
    render json: {
      elementary_correct_percents_per_month: elementary_correct_percents_per_month,
      intermediate_correct_percents_per_month: intermediate_correct_percents_per_month,
      advanced_correct_percents_per_month: advanced_correct_percents_per_month,
    }, status: :ok
  end

  private

  def uniq_correct_percents_per_month(temporary_correct_percents_per_month)
    max_correct_percents_per_month = []
    temporary_correct_percents_per_month.each do |correct_percent_1|
      temporary_storage = correct_percent_1
      temporary_correct_percents_per_month.each do |correct_percent_2|
        if temporary_storage[:play_date] == correct_percent_2[:play_date]
          temporary_storage = temporary_storage[:correct_percent] >= correct_percent_2[:correct_percent] ?
                                temporary_storage : correct_percent_2
        end
      end
      max_correct_percents_per_month << temporary_storage
    end
    return max_correct_percents_per_month.uniq
  end
end
