class Api::V1::GameManagementsController < ApplicationController
  MIN_TIMES = 14
  skip_before_action :require_login
  skip_before_action :verify_authenticity_token, only: :start
  after_action :set_csrf_token_header, only: %i(start finish)

  # startに関するbefore_action
  before_action :set_start_game_management, only: :start
  before_action :set_monster, only: :start
  before_action :set_questions, only: :start

  # finishに関するbefore_action
  before_action :set_finish_game_management, only: :finish
  before_action :set_correct_questions, only: :finish
  before_action :set_incorrect_questions, only: :finish

  # タイトルに関する処理
  # ランクアップしているかつ、
  # ユーザーのランクが、CONDITION_HASHのバリューのランクを満たすなら、
  # active_titleを更新する
  # active_titleに代入しているので、ランクが上がるごとに、マイページで設定したタイトルが
  # 変更される
  CONDITION_HASH = {
    一人前ハンター: 2,
    玄人ハンター: 4,
    いにしえのハンター: 6,
    天才と呼ばれしハンター: 8,
    伝説のハンター: 10,
    無我の境地: 12,
    語り継がれし英雄: 14
  }

  def start
    # レンダリング
    # このユーザーはゲームに使うユーザー
    # contextのユーザーとは何も関係ない
    render json: {
      game_management: @game_management,
      questions: @questions,
      monster: @monster,
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
  # ゲームに勝つか負けると、finishアクションが実行される
  def finish
    # 早期リターン
    # ログインユーザーが存在しないなら、ゲームデータをDBに保存しない
    return render json: {
      send_game_data: true
    }, status: :ok unless current_user

    @game_management.add_correct_questions(@correct_questions)
    @game_management.add_incorrect_questions(@incorrect_questions)
    @game_management.save!

    # ログインユーザーのステータスを更新する処理
    # ランクアップしている場合、temporary_experienceが0になる
    # さらに、あるランクに到達すると称号を解放する
    # current_userにsaltやcrypted_passwordなどのカラムを含めてjsonを送ってはダメ
    if rank_up? && CONDITION_HASH.values.include?(params[:current_user][:rank] + 1)
      current_user.release_titles.build(
        release_date: Date.today,
        title_id: (Title.find_by(name: CONDITION_HASH.key(params[:current_user][:rank] + 1)))[:id]
      )
      current_user.update(
        rank: params[:current_user][:rank] + 1,
        total_experience: params[:current_user][:total_experience],
        maximum_experience_per_rank: params[:current_user][:maximum_experience_per_rank] + 100,
        temporary_experience: 0,
        active_title: CONDITION_HASH.key(params[:current_user][:rank] + 1)
      )
    elsif rank_up?
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
      )
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
        rank_up: rank_up? ? true : false
      }
    }, status: :created
  end

  private

  # start時にgame_managementを生成する関数
  # current_userが存在しないなら、user_idのバリューがnilになる
  def set_start_game_management
    @game_management = GameManagement.new(
                         difficulty: params[:difficulty],
                         game_result: "progress",
                         play_date: Date.today,
                         user_id: current_user ? current_user.id : nil
                       )
  end

  # start時にモンスターを取得する関数
  def set_monster
    @monster = Monster.find_by(difficulty: params[:difficulty])
  end

  # 問題に関する処理
  # RAND()を使うと、本番のDBによっては使えなかったりするので、
  # sampleを使う。
  # sample(14)でpluck(:id)の配列の中で、要素をランダムに14個、1つの配列として返す
  # ただ、DBから取得しても、結局小さい順になるので、shuffleメソッドを使う
  # shuffleで配列の要素をランダムにシャッフルして、その結果を配列として返す
  def set_questions
    indices = Question.where(difficulty: params[:difficulty]).pluck(:id).sample(14)
    @questions = Question.where(id: indices, difficulty: params[:difficulty]).shuffle;
  end

  # ゲーム終了時のgame_management
  def set_finish_game_management
    @game_management = current_user.game_managements.
                        create(
                          difficulty: params[:game_management][:difficulty],
                          game_result: params[:game_management][:game_result],
                          result_time: params[:game_management][:result_time],
                          play_date: Date.today
                        )
  end

  # ゲーム終了時のcorrect_questions
  def set_correct_questions
    @correct_questions = params[:judgement][:correct]
  end

  # ゲーム終了時のincorrect_questions
  def set_incorrect_questions
    @incorrect_questions = params[:judgement][:incorrect]
  end

  # current_userのtemporary_experienceがmaximum_experience_per_rank以上になると、
  # trueになる関数
  def rank_up?
    if params[:current_user][:temporary_experience] >= params[:current_user][:maximum_experience_per_rank]
      true
    else
      false
    end
  end
end
