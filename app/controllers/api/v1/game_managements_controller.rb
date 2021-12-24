class Api::V1::GameManagementsController < ApplicationController
  MIN_TIMES = 10
  skip_before_action :verify_authenticity_token, only: :start
  after_action :set_csrf_token_header, only: :start

  def start
    # ゲームに関する処理
    game_management = current_user ?
                        current_user.game_managements.
                          create(
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
    render json: {
      game_management: game_management,
      question: questions,
      monster: monster
    }, status: :created
  end

  def finish
    # 早期リターン
    return render json: {}, status: :ok unless current_user

    # ゲーム管理に関する処理
    # solved_questionsの2箇所は、GameManagementモデルに記述して一つにまとめる。
    # GameManagementモデルのsoleved_questonsは、throughをつけなくて良い。中間テーブルだけにデータを直接入れる。
    game_management = current_user.game_managements.find(params[:game_management][:id])
    game_management.assign_attributes(game_result: params[:game_managemet][:game_result],
                                      result_time: params[:game_management][:result_time])
    game_management.save!
    correct_questions = params[:judgement][:correct]
    incorrect_questions = params[:judgement][:incorrect]
    game_management.solved_questions << Array.new(correct_questions.length) do |i|
                                          SolvedQuestion.new(judgement: :correct,
                                                             question_id: correct_questions[i][:id])
                                        end
    game_management.solved_questions << Array.new(incorrect_questions.length) do |i|
                                          SolvedQuestion.new(judgement: :incorrect,
                                                             question_id: incorrect_questions[i][:id])
                                        end

    # ログインユーザーに関する処理
    # current_userにsaltやcrypted_passwordなどのカラムを含めてjsonを送ってはダメ
    current_user.update_attributes(params[:current_user])

    # タイトルに関する処理
    # release_titles <<は、Userモデルに記述する。
    # Userモデルのrelease_titlesは、throughをつけなくて良い。中間テーブルだけにデータを直接入れる。
    if params[:release_title]
      title = Title.find_by(name: params[:release_title][:name])
      current_user.release_titles << title.release_titles.
                                           build(release_date: params[:release_title][:release_date])
    end

    # レンダリング
    render json: {}, status: :created
  end
end
