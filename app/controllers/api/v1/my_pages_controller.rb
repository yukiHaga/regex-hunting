class Api::V1::MyPagesController < ApplicationController
  def index
    # 今日を含めた1ヶ月分の各日におけるゲーム頻度に関する処理
    # モデルに移す。
    today = Date.today
    beginning_day = today.beginning_of_month
    last_day = today.end_of_month
    this_month = beginning_day..last_day
    game_managements_per_month = current_user.game_managements.where(play_date: this_month)
    # 今月の各日におけるゲーム回数
    # play_date(key)とカウント数(value)を持つハッシュがgame_frequencies_per_monthに代入
    game_frequencies_per_month = game_managements_per_month.group(:play_date).count

    # 1ヶ月分の各日における正解率に関する処理
    # 重複している日付の正答率も含まれている。
    # デフォルトで1ヶ月
    # モデルに移す。
    temporary_correct_percents_per_month = game_managements_per_month.map do |game_management|
                         correct = game_management.solved_questions.where(judgement: :correct)
                         incorrect = game_management.solved_questions.where(judgement: :incorrect)
                         play_date = game_management[:play_date]
                         correct_percent = (correct * (correct + incorrect)) * 100
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

    # 解放したタイトルデータ
    # モデルに移す。
    release_titles = current_user.release_titles
    owned_titles = release_titles.map do |release_title|
                     {name: release_title.title[:name], release_date: release_title[:release_date]}
                   end

    # 解放していないタイトルデータ
    # モデルに移す。
    release_title_names = current_user.has_titles.pluck(:name)
    unavailable_titles = Title.where.not(name: release_title_names)

    # レンダリング
    # ユーザー情報はstateに保管されているので、返す必要はない。
    render json: {
      game_frequencies_per_month: game_frequencies_per_month,
      correct_percents_per_month: uniq_correct_percents_per_month,
      owned_titles: owned_titles,
      unavailable_titles: unavailable_titles
    }, status: :ok
  end
end
