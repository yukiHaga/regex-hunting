class Api::V1::MyPagesController < ApplicationController
  after_action :set_csrf_token_header, only: :index

  # 実際にフロントに送られる問題数は14

  def index

    # 今月のRangeオブジェクトを生成する
    today = Date.today
    beginning_day = today.beginning_of_month
    last_day = today.end_of_month
    this_month = beginning_day..last_day

    # 今月の各日におけるゲーム回数
    # win, lose関係なしに取得する
    # COUNT(*)は、play_dateのグループ毎に実施される
    # play_dateとgame_frequenciesをキーに持つARオブジェクトが生成される
    game_frequencies_per_day =  current_user.game_managements.
                                  where(play_date: this_month).
                                  group(:play_date).
                                  select("play_date, COUNT(*) AS game_frequencies")

    # 今月の各難易度のプレイ時間
    # win, lose関係なしに取得する
    # SUM(result_time)は、difficultyのグループ毎に実施される
    # difficultyとtotal_timeをキーに持つARオブジェクトが生成される
    total_time_per_difficulty = curernt_user.game_managements.
                                  where(play_date: this_month).
                                  group(:difficulty).
                                  select("difficulty, SUM(result_time) AS total_time")

    # 今月かつ各難易度の1ゲーム当たりの正解数を取得
    # idとdifficultyでグループ化するので、そのグループ内のplay_dateは全て同じ値である
    # こうすることで、日付に関わらず1ゲーム当たりの正解数を導出できる
    # win lose関係なしに取得する
    subquery = current_user.game_managements.
                 joins(:solved_questions).
                 where(
                   play_date: this_month,
                   solved_questions: { judgement: :correct }).
                 group(:id, :difficulty).
                 select("difficulty, COUNT(*) AS correct").

    # 今月の各難易度の平均正解数
    # fromメソッドとサブクエリを組み合わせることで、
    # fromの結果がcurrent_userの結果なので、current_userを前につけなくても大丈夫
    # サブクエリの結果をテーブルとして使うことができる
    # 難易度のグループ毎にAVG(correct)を計算する
    # AVG(correct)によって、正解数の平均値が取得できる
    # グループ毎にやると、グループ毎の正解数の平均値が取得できる
    correct_avg_per_difficulty = GameManagement.from("(#{subquery.to_sql}) AS results").
                                   group(:difficulty).
                                   select("difficulty, AVG(correct) AS correct_avg")

    # 今月かつwinかつ各難易度の最速タイム
    fast_time_per_difficulty = current_user.game_managements.
                                 where(
                                   play_date: this_month,
                                   game_result: "win").
                                 group(:difficulty).
                                 select("difficulty, MIN(result_time) AS fast_time")

    # 解放したタイトルデータ
    # 解放していないタイトルのデータも入っている
    # その場合はrelease_dateがnilになる
    # owned_titlesはnameとrelease_dateをキーに持つARオブジェクト
    # titlesテーブルにrelease_conditionというカラムを追加したが
    # 必要ないので消す
    owned_titles = Title.eager_load(:release_titles).
                         where(release_titles: { user_id: current_user.id }).
                         select("name, release_date");

    # レンダリング
    # ユーザー情報はcontextのstateに保管されているので、返す必要はない。
    render json: {
      game_frequencies_per_day: game_frequencies_per_day,
      total_time_per_difficulty: total_time_per_difficulty,
      correct_avg_per_difficulty: correct_avg_per_difficulty,
      fast_time_per_difficulty: fast_time_per_difficulty,
      owned_titles: owned_titles,
    }, status: :ok
  end
end
