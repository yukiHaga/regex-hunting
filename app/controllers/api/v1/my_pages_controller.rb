class Api::V1::MyPagesController < ApplicationController
  after_action :set_csrf_token_header, only: :index

  before_action :set_this_month

  # 実際にフロントに送られる問題数は14

  def index
    game_frequencies_per_day = query_game_frequencies_per_day(@this_month)
    total_time_per_difficulty = query_total_time_per_difficulty(@this_month)
    game_clear_count_per_difficulty = query_game_clear_count_per_difficulty(@this_month)
    fast_time_per_difficulty = query_fast_time_per_difficulty(@this_month)
    owned_titles = query_owned_titles

    # レンダリング
    # ユーザー情報はcontextのstateに保管されているので、返す必要はない。
    render json: {
      game_frequencies_per_day: game_frequencies_per_day,
      total_time_per_difficulty: total_time_per_difficulty,
      game_clear_count_per_difficulty: game_clear_count_per_difficulty,
      fast_time_per_difficulty: fast_time_per_difficulty,
      owned_titles: owned_titles
    }, status: :ok
  end

  private

    # 今月のRangeオブジェクトを生成する
    def set_this_month
      today = Time.zone.today
      beginning_day = today.beginning_of_month
      last_day = today.end_of_month
      @this_month = beginning_day..last_day
    end

    # 今月の各日におけるゲーム回数
    # win, lose関係なしに取得する
    # play_dateをキー、頻度をバリューに持つハッシュが生成される
    def query_game_frequencies_per_day(this_month)
      current_user.game_managements
                  .where(play_date: this_month)
                  .group(:play_date)
                  .count
    end

    # 今月の各難易度のプレイ時間
    # win, lose関係なしに取得する
    # SUM(result_time)は、difficultyのグループ毎に実施される
    # selectメソッド内に集約関数を入れた場合、.total_timeでその値を呼び出すことができる
    # selectメソッドの集約関数の結果は、ARオブジェクトにフィールドとして反映されないので、
    # 自分でオブジェクトを作る
    def query_total_time_per_difficulty(this_month)
      current_user.game_managements
                  .where(play_date: this_month)
                  .group(:difficulty)
                  .select('difficulty, SUM(result_time) AS total_time')
                  .to_h do |data|
        [data.difficulty, data.total_time]
      end
    end

    # 今月の各難易度のゲームクリア回数
    # 難易度がキー、今月の難易度におけるクリア回数がバリューになる
    # キーバリューを3つ持つ1つのハッシュが作成される
    def query_game_clear_count_per_difficulty(this_month)
      current_user.game_managements
                  .where(
                    play_date: this_month,
                    game_result: 'win'
                  )
                  .group(:difficulty)
                  .select('difficulty, COUNT(*) AS total_count')
                  .to_h do |data|
        [data.difficulty, data.total_count]
      end
    end

    # 今月かつwinかつ各難易度の最速タイム
    def query_fast_time_per_difficulty(this_month)
      current_user.game_managements
                  .where(
                    play_date: this_month,
                    game_result: 'win'
                  )
                  .group(:difficulty)
                  .select('difficulty, MIN(result_time) AS fast_time')
                  .to_h do |data|
        [data.difficulty, data.fast_time]
      end
    end

    # ユーザーのrelease_titlesのtitle_idとrelease_dateを取得する
    # titile_idをキー、release_dateをバリューにもつハッシュが生成される
    # キーバリューの個数は、release_titlesテーブルから取ってきたレコードの数と同じ
    # {"1"=>Wed, 26 Jan 2022}のような形
    # 解放したタイトルデータ
    # 解放していないタイトルのデータも入っている
    # その場合はrelease_dateがnilになる
    # 存在しないキーをrelease_title_hashに指定するとnilが帰ってくるから
    # titlesテーブルのrelease_conditionは、解放条件である
    def query_owned_titles
      release_title_hash = current_user.release_titles
                                       .select('title_id, release_date')
                                       .to_h do |release_title|
        [release_title.title_id.to_s, release_title.release_date]
      end

      Title.all.map do |title|
        {
          name: title[:name],
          release_condition: title[:release_condition],
          release_date: release_title_hash[(title[:id]).to_s]
        }
      end
    end
end
