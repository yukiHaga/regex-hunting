# ユーザー
# 3人作る。
# 本番環境では作らない
# userとgame_managementは、開発環境で固定したいデータな為、idを持たせた
# userの指定していないカラムは、DBに設定したデフォルト値が適用される
3.times do |n|
  User.seed(
    {
      id: n + 1,
      name: Faker::Name.unique.first_name,
      email: Faker::Internet.unique.email,
      password: "315#{n}Test",
      password_confirmation: "315#{n}Test"
    }
  )

  # 初級のゲームマネジメント
  # 60000msな為、秒に換算すると60秒である
  3.times do |_m|
    GameManagement.seed(
      {
        id: _m + 1,
        difficulty: :elementary,
        game_result: :win,
        result_time: '120000',
        play_date: Faker::Date.between(from: '2021-12-01', to: '2021-12-10'),
        user_id: n + 1
      }
    )

    # idが1から10の問題が出題されたと仮定し、全問正解したとする
    # idを持たせなくて良い
    10.times do |t|
      SolvedQuestion.seed(
        {
          judgement: :correct,
          game_management_id: _m + 1,
          question_id: t + 1
        }
      )
    end
  end

  # 中級のゲームマネジメント
  # 60000msな為、秒に換算すると60秒である
  3.times do |_m|
    GameManagement.seed(
      {
        id: _m + 4,
        difficulty: :intermediate,
        game_result: :win,
        result_time: '120000',
        play_date: Faker::Date.between(from: '2021-12-01', to: '2021-12-10'),
        user_id: n + 1
      }
    )

    # idが1から10の問題が出題されたと仮定し、全問正解したとする
    # idを持たせなくて良い
    10.times do |t|
      SolvedQuestion.seed(
        {
          judgement: :correct,
          game_management_id: _m + 4,
          question_id: t + 1
        }
      )
    end
  end

  # 上級のゲームマネジメント
  # 60000msな為、秒に換算すると60秒である
  3.times do |_m|
    GameManagement.seed(
      {
        id: _m + 7,
        difficulty: :advanced,
        game_result: :win,
        result_time: '120000',
        play_date: Faker::Date.between(from: '2021-12-01', to: '2021-12-10'),
        user_id: n + 1
      }
    )

    # idが1から10の問題が出題されたと仮定し、全問正解したとする
    # idを持たせなくて良い
    10.times do |t|
      SolvedQuestion.seed(
        {
          judgement: :correct,
          game_management_id: _m + 7,
          question_id: t + 1
        }
      )
    end
  end

  # リリースタイトル
  # レベルアップしてないユーザーな為、見習いハンターだけリリースタイトルしておく
  # idを持たせなくて良い
  ReleaseTitle.seed(
    {
      release_date: Faker::Date.between(from: '2021-12-01', to: '2021-12-10'),
      user_id: n + 1,
      title_id: 1
    }
  )
end
