class Api::V1::GameManagementsController < ApplicationController
  MIN_TIMES = 14
  skip_before_action :require_login
  skip_before_action :verify_authenticity_token, only: :start
  after_action :set_csrf_token_header, only: %i[start finish]

  # startに関するbefore_action
  # set_userをfinishで実行すると、ステータスが更新されたデータをフロントに送ることができない為、
  # finishでset_userを使用することはやめた
  before_action :set_start, only: :start

  # finishに関するbefore_action
  # current_userが存在するときだけ、実行させる
  # logged_in?は現在ログイン中かどうか、true or falseで返す。
  before_action :set_finish, only: :finish, if: :logged_in?

  def start
    # このユーザーはゲームに使用するユーザー
    # contextのユーザーとは何も関係ない
    render json: {
      game_management: @game_management,
      questions: @questions,
      monster: @monster,
      user: @user
    }, status: :ok
  end

  # finishに送る際に作成されたデータを使ってゲーム結果画面を作る為、
  # finishでゲーム関連のデータを返す必要は特にない
  # ゲームに勝つか負けると、finishアクションが実行される
  def finish
    # 早期リターン
    # ログインユーザーが存在しないなら、ゲームデータをDBに保存しない
    return render json: { send_game_data: true }, status: :ok unless current_user

    @game_management.add_correct_questions(@correct_questions)
    @game_management.add_incorrect_questions(@incorrect_questions)
    @game_management.save!

    # ログインユーザーのステータスを更新する処理
    # レベルアップしている場合、temporary_experienceが0になる
    # さらに、あるレベルに到達すると称号を解放する
    # current_userにsaltやcrypted_passwordなどのカラムを含めてjsonを送ってはダメ
    if rank_up? && Settings.GAME_CONDITION_HASH.to_h.values.include?(params[:current_user][:rank] + 1)
      current_user.release_new_title((Title.find_by(name: Settings.GAME_CONDITION_HASH.to_h.key(params[:current_user][:rank] + 1)))[:id])
      current_user.update(
        rank: params[:current_user][:rank] + 1,
        total_experience: params[:current_user][:total_experience],
        maximum_experience_per_rank: params[:current_user][:maximum_experience_per_rank] + 100,
        temporary_experience: 0,
        active_title: Settings.GAME_CONDITION_HASH.to_h.key(params[:current_user][:rank] + 1)
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
        temporary_experience: params[:current_user][:temporary_experience]
      )
    end

    # ログインユーザーに返すjson
    # このuserのデータはcontextのユーザーに反映される
    render json: {
      send_game_data: true,
      session: true,
      user: User.handle_game_user_serializer(current_user).merge({ rank_up: rank_up? ? true : false })
    }, status: :created
  end

  private

    # set_startは、ゲーム開始に必要なインスタンス変数を返すプライベートメソッド
    # current_userが存在しないなら、@game_managementのuser_idのバリューがnilになる
    # indicesと@questionsは、問題に関する処理
    # RAND()を使用すると、本番のDBによっては使えなかったりする為、sampleを使用する。
    # sample(14)でpluck(:id)の配列の中で、要素をランダムに14個、1つの配列として返す
    # ただ、DBから取得しても、結局小さい順になるため、shuffleメソッドを使用する
    # shuffleで配列の要素をランダムにシャッフルして、その結果を配列として返す
    # ログインユーザーがゲームをプレイする場合、ログインユーザーのデータをJSON形式でシリアライズする
    # ゲストユーザーがゲームをプレイする場合、ゲストユーザー用のデータを@userに代入する
    # User.handle_game_user_serializer(nil)で例外が発生する
    def set_start
      @game_management = GameManagement.new(
        difficulty: params[:difficulty],
        game_result: 'progress',
        play_date: Time.zone.today,
        user_id: current_user ? current_user.id : nil
      )
      @monster = Monster.find_by(difficulty: params[:difficulty])
      indices = Question.where(difficulty: params[:difficulty]).pluck(:id).sample(14)
      @questions = Question.where(id: indices, difficulty: params[:difficulty]).shuffle
      @user = if current_user
                User.handle_game_user_serializer(current_user)
              else
                Settings.GUEST_USER.to_h
              end
    end

    # set_startは、ゲーム終了に必要なインスタンス変数を返すプライベートメソッド
    def set_finish
      @game_management = current_user.game_managements
                                     .create(
                                       difficulty: params[:game_management][:difficulty],
                                       game_result: params[:game_management][:game_result],
                                       result_time: params[:game_management][:result_time],
                                       play_date: Time.zone.today
                                     )
      @correct_questions = params[:judgement][:correct]
      @incorrect_questions = params[:judgement][:incorrect]
    end

    # current_userのtemporary_experienceがmaximum_experience_per_rank以上になると、
    # trueになる関数
    def rank_up?
      params[:current_user][:temporary_experience] >= params[:current_user][:maximum_experience_per_rank]
    end
end
