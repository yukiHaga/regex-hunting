# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# モンスター
Monster.create!(
  name: "スクータム",
  max_hp: 100,
  attack: 50,
  defence: 10,
  difficulty: "elementary"
)

Monster.create!(
  name: "カスアリウス",
  max_hp: 100,
  attack: 100,
  defence: 10,
  difficulty: "intermediate"
)

Monster.create!(
  name: "オルファ・ラパクス",
  max_hp: 100,
  attack: 150,
  defence: 10,
  difficulty: "advanced"
)

# タイトル
10.times do |s|
  Title.create!(
    name: User.active_titles.keys[s]
  )
end

# 1問目
Question.create!(
  sentence: "1, 5, 9の全てにマッチする正規表現を入力せよ。",
  target_sentence: "1, 5, 9",
  sample_answer: "\\d",
  commentary: "\\dは1桁の数字を表します。[0-9]で書き換え可能です。",
  difficulty: "elementary"
)

# 2問目
Question.create!(
  sentence: "10, 20, 30の全てにマッチする正規表現を入力せよ。",
  target_sentence: "10, 20, 30",
  sample_answer: "\\d{2}",
  commentary: "\\d{2}は2桁の数字を表します。\\d+でマッチさせることもできます。",
  difficulty: "elementary"
)

# 3問目
Question.create!(
  sentence: "100, 1000, 10000の全てにマッチする正規表現を入力せよ。",
  target_sentence: "100, 1000, 10000",
  sample_answer: "\\d{3,5}",
  commentary: "\\d{3,5}は3桁~5桁の数字を表します。\\d+でマッチさせることもできます。",
  difficulty: "elementary"
)

# 4問目
Question.create!(
  sentence: "1000, 10000, 100000にマッチする正規表現を入力せよ。",
  target_sentence: "10, 100, 1000, 10000, 100000",
  sample_answer: "\\d{4,6}",
  commentary: "\\d{4,6}は4桁~6桁の数字を表します。\\d{4,}でマッチさせることもできます。",
  difficulty: "elementary"
)

# 5問目
Question.create!(
  sentence: "A, B, Zの全てにマッチする正規表現を入力せよ。",
  target_sentence: "A, B, Z",
  sample_answer: "[ABZ]",
  commentary: "[ABZ]はA, B, Zのどれか一文字を表します。[A-Z]でマッチさせることもできます。",
  difficulty: "elementary"
)

# 6問目
Question.create!(
  sentence: "A, 9, Zの全てにマッチする正規表現を入力せよ。",
  target_sentence: "A, 9, Z",
  sample_answer: "[A9Z]",
  commentary: "[A9Z]はA, 9, Zのどれか一文字を表します。\\wでマッチさせることもできます。",
  difficulty: "elementary"
)

# 7問目
Question.create!(
  sentence: "A, a, 9の全てにマッチする正規表現を入力せよ。",
  target_sentence: "A, a, 9",
  sample_answer: "\\w",
  commentary: "\\wはa~z, A~Z, 0~9, _の中の1文字を表します。[a-zA-Z\\d]で書き換え可能です。",
  difficulty: "elementary"
)

# 8問目
Question.create!(
  sentence: "aaa, aaaa, aaaaaにマッチする正規表現を入力せよ。",
  target_sentence: "aaa, aaaa, aaaaa, a, aa",
  sample_answer: "a{3,5}",
  commentary: "a{3,5}はaaa, aaaa, aaaaaを表します。",
  difficulty: "elementary"
)

# 9問目
Question.create!(
  sentence: "X, y, Zの全てにマッチする正規表現を入力せよ。",
  target_sentence: "X, y, Z",
  sample_answer: "[XyZ]",
  commentary: "[XyZ]はX, y, Zを表します。\\w, [a-zA-Z]でマッチさせることもできます。",
  difficulty: "elementary"
)

# 10問目
Question.create!(
  sentence: "aaa, bbb, cccの全てにマッチする正規表現を入力せよ。",
  target_sentence: "aaa, bbb, ccc",
  sample_answer: "aaa|bbb|ccc",
  commentary: "aaa|bbb|cccはaaa, bbb, cccを表します。[a-z]{3}でマッチさせることもできます。",
  difficulty: "elementary"
)

# 11問目
Question.create!(
  sentence: "aaa, baaa, caの全てにマッチする正規表現を入力せよ。",
  target_sentence: "aaa, baaa, ca",
  sample_answer: "aaa|baaa|ca",
  commentary: "aaa|baaa|caはaaa, baaa, caを表します。[a-z]{2,4}で書き換え可能です。",
  difficulty: "elementary"
)

# 12問目
Question.create!(
  sentence: "aaa, 999, cccの全てにマッチする正規表現を入力せよ。",
  target_sentence: "aaa, 999, ccc",
  sample_answer: "aaa|999|ccc",
  commentary: "aaa|999|cccはaaa, 999, cccを表します。\\w{3}でマッチさせることもできます。",
  difficulty: "elementary"
)

# 13問目
Question.create!(
  sentence: "#, %, @の全てにマッチする正規表現を入力せよ。",
  target_sentence: "#, %, @",
  sample_answer: "[#%@]",
  commentary: "[#%@]は#, %, @を表します。",
  difficulty: "elementary"
)

# 14問目
Question.create!(
  sentence: "aaa, bbb, cccにマッチする正規表現を入力せよ。",
  target_sentence: "aaa, bbb, ccc, ddd, eee",
  sample_answer: "aaa|bbb|ccc",
  commentary: "aaa|bbb|cccはaaa, 999, cccを表します。[abc]{3}でマッチさせることもできます。",
  difficulty: "elementary"
)

# ユーザー
3.times do |n|
  user = User.new(
    name: Faker::Name.unique.first_name,
    email: Faker::Internet.unique.email,
    password: "315#{n}Test",
    password_confirmation: "315#{n}Test"
  )
  user.save!

  # ゲームマネジメント
  # 50000msなので、秒に換算すると50秒である
  5.times do |m|
    game_management = user.game_managements.build(
      difficulty: :elementary,
      game_result: :win,
      result_time: "50000",
      play_date: Faker::Date.between(from: '2021-12-01', to: '2021-12-10')
    )
    game_management.save!

    # クエスション
    10.times do |t|
      game_management.solved_questions.build(
        judgement: :correct,
        question_id: t + 1
      )
    end
    game_management.save!
  end

  # リリースタイトル
  3.times do |t|
    user.release_titles.build(
      release_date: Faker::Date.between(from: '2021-12-01', to: '2021-12-10'),
      title_id: t + 1
    )
  end
  user.save!
end
