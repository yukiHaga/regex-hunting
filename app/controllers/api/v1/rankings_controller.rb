class Api::V1::RankingsController < ApplicationController
  skip_before_action :require_login, only: :index
  after_action :set_csrf_token_header, only: :index

  # 自分のランクを表示する部分は一旦保留。かなりムズイ
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

    # joinsメソッドでusersテーブルと内部結合する
    # groupメソッドでusersテーブルのidに対してグループ化する(nameでグループ化すると、同じ名前のユーザーがいる為)
    # groupメソッドを集計関数と一緒ではなく単体で使うと、指定したカラムでレコードがグループ化され、
    # グループ毎に1番小さいidのレコードが表示される(裏側では全てのレコードが指定したカラムでグループ化されている)
    # whereで取得するレコードに条件を設定する
    # orderメソッドでresult_timeを小さい順にする(デフォルトで昇順。グループ化と検索の後に実行される)
    # limitで取得するレコード数を制限する
    # selectメソッドで取得するカラムを指定する。selectがないとjoinsはGameManagementの全カラムのデータを返す
    # テーブルの指定→結合(joins)→取得条件(where)→グループ化(group)→検索(select)→順序(order)→LIMIT(limit)
    # の順番でSQLが実行される
    # その為、orderを実行した時点で、groupの返す1件がグループ毎のidが一番小さいレコードではなく、
    # グループ毎のresult_timeが一番小さいレコードを返す
    # (グループ毎に、result_timeが一番小さいレコードが昇順になっているため)
    # その為、集計関数でデータを作らなくても、最小値のレコードは取得できる
    # と思ったのだが、group化した時にMINを実行しないと、最小値の順になっていなかったので、
    # MINを追加しました。MINを追加したらちゃんと最小順になった
    def get_top_ten(difficulty)
      top_ten_array = GameManagement.joins(:user)
                                    .group('users.id')
                                    .where(
                                      difficulty: difficulty,
                                      game_result: :win,
                                      user_id: User.where(open_rank: true).pluck(:id)
                                    )
                                    .order(:result_time)
                                    .limit(10)
                                    .select(
                                      "game_managements.*,
                                       users.name,
                                       users.rank,
                                       users.active_title,
                                       MIN(game_managements.result_time) AS min_result_time"
                                    )
                                    .eager_load(user: { avatar_attachment: :blob }).to_a
                                    .map do |data|
        {
          game_management: data,
          user: {
            name: data.name,
            rank: data.rank,
            active_title: User.active_titles.key(data.active_title),
            image: data.user.avatar.attached? ? url_for(data.user.avatar) : nil
          }
        }
      end
    end
end
