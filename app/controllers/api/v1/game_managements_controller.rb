class Api::V1::GameManagementsController < ApplicationController
  MIN_TIMES = 14
  skip_before_action :require_login
  skip_before_action :verify_authenticity_token, only: :start
  after_action :set_csrf_token_header, only: %i(start finish)

  def start
    # ゲームに関する処理
    game_management = current_user ?
                        current_user.game_managements.
                          build(
                            difficulty: params[:difficulty],
                            game_result: "progress",
                            result_time: Time.zone.now,
                            play_date: Date.today
                          )
                      :
                        GameManagement.new(
                          difficulty: params[:difficulty],
                          game_result: "progress",
                          result_time: Time.zone.now,
                          play_date: Date.today
                        )

    # 問題に関する処理
    # indicesは、全てのQuestionのidが格納された変数
    # sampleメソッドは、配列の要素を1個ランダムに返す
    # search_indicesという配列に取得したidを格納する
    # Array#deleteで、indicesからsearch_indexの値を削除する
    indices = Question.where(difficulty: params[:difficulty]).pluck(:id)
    search_indices = []
    MIN_TIMES.times do
      search_index = indices.sample
      search_indices << search_index
      indices.delete(search_index)
    end
    questions = Question.where(id: search_indices, difficulty: params[:difficulty]);

    # モンスターに関する処理
    monster = Monster.find_by(difficulty: params[:difficulty])

    # レンダリング
    # このユーザーはゲームに使うユーザー
    # contextのユーザーとは何も関係ない
    render json: {
      game_management: game_management,
      questions: questions.shuffle,
      monster: monster,
      user: {
        rank: current_user ? current_user[:rank] : 1,
        total_experience: current_user ? current_user[:total_experience] : 0,
        maximum_experience_per_rank: current_user ?
          current_user[:maximum_experience_per_rank] : 500,
        temporary_experience: current_user ?
          current_user[:temporary_experience] : 0,
        prev_temporary_experience: current_user ?
          current_user[:temporary_experience] : 0,
        active_title: current_user ?
          current_user[:active_title] : "見習いハンター"
      }
    }, status: :created
  end

  # finishに送る際に作成されたデータを使ってゲーム結果画面を作るので、
  # finishでゲーム関連のデータを返す必要は特にない
  def finish
    # 早期リターン
    # ログインユーザーが存在しないなら、ゲームデータをDBに保存しない
    return render json: {
      send_game_data: true
    }, status: :ok unless current_user

    # ゲーム管理に関する処理
    # solved_questionsの2箇所は、GameManagementモデルに記述して一つにまとめる。
    # GameManagementモデルのsoleved_questonsは、
    # throughをつけなくて良い。中間テーブルだけにデータを直接入れる。
    game_management = current_user.game_managements.
                        create(
                          difficulty: params[:game_management][:difficulty],
                          game_result: params[:game_management][:game_result],
                          result_time: params[:game_management][:result_time],
                          play_date: Date.today
                        )

    correct_questions = params[:judgement][:correct]
    incorrect_questions = params[:judgement][:incorrect]
    game_management.solved_questions << Array.new(correct_questions.length) do |i|
      SolvedQuestion.new(
        judgement: :correct,
        question_id: correct_questions[i][:question][:id]
      )
    end
    game_management.solved_questions << Array.new(incorrect_questions.length) do |i|
      SolvedQuestion.new(
        judgement: :incorrect,
        question_id: incorrect_questions[i][:question][:id]
      )
    end

    game_management.save!

    # ログインユーザーのステータスを更新する処理
    # ランクアップしている場合、temporary_experienceが0になる
    # current_userにsaltやcrypted_passwordなどのカラムを含めてjsonを送ってはダメ
    if params[:current_user][:temporary_experience] >= params[:current_user][:maximum_experience_per_rank]
      current_user.update(
        rank: params[:current_user][:rank] + 1,
        total_experience: params[:current_user][:total_experience],
        maximum_experience_per_rank: params[:current_user][:maximum_experience_per_rank] + 100,
        temporary_experience: 0
      )
    else
      current_user.update(
        rank: params[:current_user][:rank],
        total_experience: params[:current_user][:total_experience],
        maximum_experience_per_rank: params[:current_user][:maximum_experience_per_rank],
        temporary_experience: params[:current_user][:temporary_experience],
        active_title: params[:current_user][:active_title]
      )
    end

    # タイトルに関する処理
    # ランクアップしているかつ、
    # ユーザーのランクが、condition_hashのバリューのランクを満たすなら、
    # active_titleを更新する
    # active_titleに代入しているので、ランクが上がるごとに、マイページで設定したタイトルが
    # 変更される
    condition_hash = {
      一人前ハンター: 2,
      先輩ハンター: 4,
      玄人ハンター: 6,
      熟練ハンター: 8,
      いにしえのハンター: 10,
      天才と呼ばれしハンター: 12,
      伝説のハンター: 14,
      無我の境地: 16,
      語り継がれし英雄: 18
    }

    if params[:current_user][:temporary_experience] >= params[:current_user][:maximum_experience_per_rank] && condition_hash.values.include?(current_user.rank)
      current_user.release_titles.build(
        release_date: Date.today,
        title_id: (Title.find_by(name: condition_hash.key(current_user.rank)))[:id]
      )
      current_user[:active_title] = condition_hash.key(current_user.rank)
      current_user.save!
    end

    # レンダリング
    # ログインユーザーに返すjson
    # このuserのデータはcontextのユーザーに反映される
    render json: {
      send_game_data: true,
      session: true,
      user: {
        rank: current_user[:rank],
        total_experience: current_user[:total_experience],
        maximum_experience_per_rank: current_user[:maximum_experience_per_rank],
        temporary_experience: current_user[:temporary_experience],
        prev_temporary_experience: current_user[:temporary_experience],
        active_title: current_user[:active_title],
        rank_up: params[:current_user][:temporary_experience] >= params[:current_user][:maximum_experience_per_rank] ?
          true : false
      }
    }, status: :created
  end
end
