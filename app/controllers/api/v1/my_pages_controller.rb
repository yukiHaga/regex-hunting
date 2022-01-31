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
    # play_dateをキー、頻度をバリューに持つARオブジェクトが生成される
    game_frequencies_per_day =  current_user.game_managements.
                                  where(play_date: this_month).
                                  group(:play_date).
                                  count

    # 今月の各難易度のプレイ時間
    # win, lose関係なしに取得する
    # SUM(result_time)は、difficultyのグループ毎に実施される
    # difficultyとtotal_timeをキーに持つARオブジェクトが生成される
    # selectメソッド内に集約関数を入れた場合、.total_timeでその値を呼び出すことができる
    # selectメソッドの集約関数の結果は、ARオブジェクトにフィールドとして反映されないので、
    # 自分でオブジェクトを作る
    total_time_per_difficulty = current_user.game_managements.
                                  where(play_date: this_month).
                                  group(:difficulty).
                                  select("difficulty, SUM(result_time) AS total_time").
                                  map do |data|
                                    {
                                      difficulty: data[:difficulty],
                                      total_time: data.total_time
                                    }
                                  end

    # fromメソッドで使うサブクエリ
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
                 select("difficulty, COUNT(*) AS correct")

    # 今月の各難易度の平均正解数
    # fromメソッドとサブクエリを組み合わせることで、
    # fromの結果がcurrent_userの結果なので、current_userを前につけなくても大丈夫
    # サブクエリの結果をテーブルとして使うことができる
    # 難易度のグループ毎にAVG(correct)を計算する
    # AVG(correct)によって、正解数の平均値が取得できる
    # グループ毎にやると、グループ毎の正解数の平均値が取得できる
    correct_avg_per_difficulty = GameManagement.from("(#{subquery.to_sql}) AS results").
                                   group(:difficulty).
                                   select("difficulty, ROUND(AVG(correct)) AS correct_avg").
                                   map do |data|
                                     {
                                       difficulty: data[:difficulty],
                                       correct_avg: data.correct_avg
                                     }
                                   end

    # 今月かつwinかつ各難易度の最速タイム
    fast_time_per_difficulty = current_user.game_managements.
                                 where(
                                   play_date: this_month,
                                   game_result: "win").
                                 group(:difficulty).
                                 select("difficulty, MIN(result_time) AS fast_time").
                                 map do |data|
                                   {
                                     difficulty: data[:difficulty],
                                     fast_time: data.fast_time
                                   }
                                 end

    # ユーザーのrelease_titlesのtitle_idとrelease_dateを取得する
    # titile_idをキー、release_dateをバリューにもつハッシュが生成される
    # キーバリューの個数は、release_titlesテーブルから取ってきたレコードの数と同じ
    # {"1"=>Wed, 26 Jan 2022}のような形
    release_title_hash = current_user.release_titles.
                           select("title_id, release_date").
                           to_h do |release_title|
                             [release_title.title_id.to_s, release_title.release_date ]
                           end

    # 解放したタイトルデータ
    # 解放していないタイトルのデータも入っている
    # その場合はrelease_dateがnilになる
    # 存在しないキーをrelease_title_hashに指定するとnilが帰ってくるから
    # titlesテーブルのrelease_conditionは、解放条件である
    owned_titles = Title.all.map do |title|
                     {
                       name: title[:name],
                       release_condition: title[:release_condition],
                       release_date: release_title_hash["#{title[:id]}"]
                     }
                   end

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
