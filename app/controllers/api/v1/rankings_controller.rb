class Api::V1::RankingsController < ApplicationController
  skip_before_action :require_login, only: :index
  after_action :set_csrf_token_header, only: :index

  # 自分のレベルを表示する部分は一旦保留。かなりムズイ
  def index
    top_ten_elementary = get_top_ten(:elementary)
    top_ten_intermediate = get_top_ten(:intermediate)
    top_ten_advanced = get_top_ten(:advanced)
    render json: {
      top_ten_elementary: top_ten_elementary,
      top_ten_intermediate: top_ten_intermediate,
      top_ten_advanced: top_ten_advanced
    }, status: :ok
  end

  private

    # joinsメソッドでusersテーブルとgame_managementsテーブルを内部結合させる
    # usersはopen_rankがtrue、game_managementsはdifficultyが実引数の値でgame_resultがwin
    # usersテーブルのidでグループにする
    # users.*, users.name, users.rank, users.active_title,
    # 各ユーザーの最小のクリアタイムをmin_result_timeとして取得する
    # orderでmin_result_timeの値でテーブルのレコードをASC(昇順)にする
    # orderの優先順位はかなり低い。さらに低いのがlimit
    # この時点で、クリアタイムが早い上位10件のデータが取得できているはずである
    # with_attached_avatarでユーザーに紐づく画像を取得する
    def get_top_ten(difficulty)
      top_ten_array = User.joins(:game_managements)
                          .where(
                            id: User.where(open_rank: true).pluck(:id),
                            game_managements: {
                              difficulty: difficulty,
                              game_result: :win
                            }
                          )
                          .group(:id)
                          .select(
                            "users.*,
                             users.name,
                             users.rank,
                             users.active_title,
                             MIN(game_managements.result_time) AS min_result_time"
                          )
                          .order('min_result_time')
                          .limit(10)
                          .with_attached_avatar.to_a
                          .map do |data|
        {
          min_result_time: data.min_result_time,
          user: {
            name: data.name,
            rank: data.rank,
            active_title: data.active_title,
            image: data.avatar.attached? ? url_for(data.avatar) : nil
          }
        }
      end
    end
end
