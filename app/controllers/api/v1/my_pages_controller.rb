class Api::V1::MyPagesController < ApplicationController
  after_action :set_csrf_token_header, only: :index

  # 実際にフロントに送られる問題数は14
  # しかし、正答率を計算する際は全体の数に10を使う
  Q_COUNT = 10

  def index
    # 今月のゲームクリアしたgame_managementsのレコードを難易度関係なしに全て取得
    # モデルに移す
    today = Date.today
    beginning_day = today.beginning_of_month
    last_day = today.end_of_month
    this_month = beginning_day..last_day
    game_managements_per_month = current_user.game_managements.
                                   where(play_date: this_month, game_result: :win)

    # 今月の各日におけるゲームクリア回数
    # これに関しては、全ての難易度を含めて日にちでグループ化する
    # play_date(key)とカウント数(value)を持つハッシュがgame_frequencies_per_dayに代入
    game_frequencies_per_day = game_managements_per_month.group(:play_date).count

    # 1ヶ月分の各日における初級, 中級, 上級の正解率に関する処理
    # 正答率はゲームクリアしているgame_managemetsのレコードに対して算出される
    # 重複している日付の正答率も含まれている
    # デフォルトで初級, 中級, 上級の1ヶ月
    # temはtemporaryの略。長いから省略した
    # モデルに移す
    temp_elementary_correct_percent = []
    temp_intermediate_correct_percents = []
    temp_advanced_correct_percents = []

    game_managements_per_month.each do |game_management|
      incorrect = game_management.solved_questions.where(judgement: :incorrect).count
      correct_percent = if incorrect == 0
                          100
                        else
                          ((Q_COUNT - incorrect) / Q_COUNT) * 100
                        end
      binding.pry
      play_date = game_management[:play_date]
      difficulty = game_management[:difficulty]
      case difficulty
        when '初級'
          temp_elementary_correct_percents << {
                                               play_date: play_date,
                                               difficulty: difficulty,
                                               correct_percent: correct_percent
                                             }
        when '中級'
          temp_intermediate_correct_percents << {
                                                 play_date: play_date,
                                                 difficulty: difficulty,
                                                 correct_percent: correct_percent
                                               }
        when '上級'
          temp_advanced_correct_percents << {
                                             play_date: play_date,
                                             difficulty: difficulty,
                                             correct_percent: correct_percent
                                           }
      end
    end

    # 各日付における初級の最大正答率を導く処理
    # 各日付毎の最大正答率を要素とした配列が、代入されている
    # 難易度ごとにやっている処理は同じなので、プライベートメソッドにした
    elementary_correct_percents = uniq_correct_percents(
                                    temp_elementary_correct_percents
                                  )

    # 各日付における中級の最大正答率を導く処理
    intermediate_correct_percents = uniq_correct_percents(
                                      temp_intermediate_correct_percents
                                    )

    # 各日付における上級の最大正答率を導く処理
    advanced_correct_percents = uniq_correct_percents(
                                  temp_advanced_correct_percents
                                )

    # 解放したタイトルデータ
    # 解放していないタイトルのデータも入っている
    # その場合はrelease_dateをnilとする
    # owned_titlesは配列
    # current_user.release_title.pluck(:title_id)で、title_idを要素とする配列を取得
    # include?はレシーバの配列が引数と等しい要素を持つ時に真を返す
    # タイトルidがその配列に含まれている場合、relase_dateに値が入る
    # モデルに移す
    title_id_array = current_user.release_title.pluck(:title_id)
    owned_titles = Title.all.map do |title|
                     if(title_id_array.include?(title[:id]))
                       {
                         name: title,
                         release_date: release_title[:release_date]
                       }
                     else
                       {
                         name: title,
                         release_date: nil
                       }
                     end
                   end

    # レンダリング
    # ユーザー情報はcontextのstateに保管されているので、返す必要はない。
    # 以下に書いてあるcorrect_percentsは、
    # 1ヶ月間の各日の最大正答率を要素とする配列である。
    render json: {
      game_frequencies_per_day: game_frequencies_per_day,
      elementary_correct_percents: elementary_correct_percents,
      intermediate_correct_percents: intermediate_correct_percents,
      advanced_correct_percents: advanced_correct_percents,
      owned_titles: owned_titles,
    }, status: :ok
  end

  private

  def uniq_correct_percents_per_month(temp_correct_percents)
    max_correct_percents = []
    temp_correct_percents.each do |temp_correct_percent_1|
      temp_storage = temp_correct_percent_1
      temp_correct_percents.each do |temp_correct_percent_2|
        if temp_storage[:play_date] == temp_correct_percent_2[:play_date]
          temp_storage = temp_storage[:correct_percent] >= temp_correct_percent_2[:correct_percent] ?
            temp_storage : temp_correct_percent_2
        end
      end
      max_correct_percents << temp_storage
    end
    return max_correct_percents.uniq
  end
end
