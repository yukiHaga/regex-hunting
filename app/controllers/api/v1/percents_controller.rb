class Api::V1::PercentsController < ApplicationController
  def get_correct_percents
    # 検索期間と難易度に応じたゲーム管理データを取得
    beginning_day = params[:search_term][:beginning_day]
    last_day = params[:search_term][:last_day]
    this_month = beginning_day..last_day
    difficulty_level = params[:difficulty_level]
    game_managements_per_month = current_user.game_managements.where(difficulty_level: difficulty_level,
                                                                     play_date: this_month)
    # 取得した全てのゲーム管理データ対して、正答率を計算する
    temporary_correct_percents_per_month = game_managements_per_month.map do |game_management|
                         correct = game_management.solved_questions.where(judgement: :correct)
                         incorrect = game_management.solved_questions.where(judgement: :incorrect)
                         play_date = game_management[:play_date]
                         correct_percent = (correct / (correct + incorrect)) * 100
                         {play_date: play_date, correct_percent: correct_percent}
                       end

    # 各日付における最大の正答率を導く処理
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
    uniq_correct_percents_per_month = max_correct_percents_per_month.uniq
  end
end
