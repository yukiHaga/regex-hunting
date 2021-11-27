class Api::V1::MyPagesController < ApplicationController
  def index
    # 今日を含めた1ヶ月分の各日における初級, 中級, 上級ゲーム頻度に関する処理
    # デフォルトで1ヶ月にする
    # モデルに移す
    today = Date.today
    beginning_day = today.beginning_of_month
    last_day = today.end_of_month
    this_month = beginning_day..last_day
    game_managements_per_month = current_user.game_managements.where(play_date: this_month)
    # 今月の各日におけるゲーム回数
    # これに関しては、全ての難易度を含めて日にちでグループ化する
    # play_date(key)とカウント数(value)を持つハッシュがgame_frequencies_per_monthに代入
    game_frequencies_per_month = current_user.game_managements.where(play_date: this_month).
                                                               group(:play_date).count

    # 1ヶ月分の各日における初級, 中級, 上級の正解率に関する処理
    # 重複している日付の正答率も含まれている
    # デフォルトで初級, 中級, 上級の1ヶ月
    # モデルに移す
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
    # 難易度ごとにやっている処理は同じなので、プライベートメソッドにした
    elementary_correct_percents_per_month = uniq_correct_percents(temporary_elementary_correct_percents_per_month)

    # 各日付における中級の最大正答率を導く処理
    intermediate_correct_percents_per_month = uniq_correct_percents(temporary_intermediate_correct_percents_per_month)

    # 各日付における上級の最大正答率を導く処理
    advanced_correct_percents_per_month = uniq_correct_percents(temporary_advanced_correct_percents_per_month)

    # 解放したタイトルデータ
    # モデルに移す
    release_titles = current_user.release_titles
    owned_titles = release_titles.map do |release_title|
                     {name: release_title.title[:name], release_date: release_title[:release_date]}
                   end

    # 解放していないタイトルデータ
    # モデルに移す
    release_title_names = current_user.has_titles.pluck(:name)
    unavailable_titles = Title.where.not(name: release_title_names)

    # レンダリング
    # ユーザー情報はstateに保管されているので、返す必要はない。
    render json: {
      game_frequencies_per_month: game_frequencies_per_month,
      elementary_correct_percents_per_month: elementary_correct_percents_per_month,
      intermediate_correct_percents_per_month: intermediate_correct_percents_per_month,
      advanced_correct_percents_per_month: advanced_correct_percents_per_month,
      owned_titles: owned_titles,
      unavailable_titles: unavailable_titles
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
