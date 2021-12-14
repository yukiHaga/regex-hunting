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
  defence: 50,
)

Monster.create!(
  name: "カスアリウス",
  max_hp: 100,
  attack: 100,
  defence: 100,
)

Monster.create!(
  name: "オルファ・ラパクス",
  max_hp: 100,
  attack: 150,
  defence: 100,
)

# タイトル
10.times do |s|
  Title.create!(
    name: User.active_titles.keys[s]
  )
end

# 1問目
Question.create!(
  sentence: "A, a, 9の全てにマッチするメタ文字を入力せよ。",
  target_sentence: "A a 9",
  sample_answer: "\\w",
  commentary: "\\wはa~zまたはA~Zまたは0~9または_の中の1文字を表します。[a-zA-Z\\d]でもOKです。",
  difficulty_level: "初級"
)

# 2問目
Question.create!(
  sentence: "100, 200, 300の全てにマッチする正規表現を入力せよ。",
  target_sentence: "100, 200, 300",
  sample_answer: "\d{3}",
  commentary: "\\d{3}は3桁の数字を表します。",
  difficulty_level: "初級"
)

# 3問目
Question.create!(
  sentence: "1000, 10000, 100000の全てにマッチする正規表現を入力せよ。",
  target_sentence: "1000, 10000, 100000",
  sample_answer: "\\d{4,6}",
  commentary: "\\d{4,6}は4桁~6桁の数字を表します。",
  difficulty_level: "初級"
)

# 4問目
Question.create!(
  sentence: "アメ, アキ, アカの全てにマッチする正規表現を入力せよ。",
  target_sentence: "アメ, アキ, アカ",
  sample_answer: "ア[メキカ]",
  commentary: "ア[メキカ]の[メキカ]は、メ, キ, カのどれか1文字を表します。そのため、ア[メキカ]は、アメ, アキ, アカを表す正規表現であると分かります。ア.でもOKです。",
  difficulty_level: "初級"
)

# 5問目
Question.create!(
  sentence: "アキチ, アイチ, アケチの全てにマッチする正規表現を入力せよ。",
  target_sentence: "アキチ, アイチ, アケチ",
  sample_answer: "ア[キイケ]チ",
  commentary: "\\ア[キイケ]チの[キイケ]は、キ, イ, ケのどれか1文字を表します。そのため、ア[キイケ]チは、アキチ, アイチ, アケチを表す正規表現であると分かります。ア.チでもOKです。",
  difficulty_level: "初級"
)

# 6問目
Question.create!(
  sentence: "アキチ, アイチ, アイールサンチの全てにマッチする正規表現を入力せよ。",
  target_sentence: "アキチ, アイチ, アイールサンチ",
  sample_answer: "ア(キ|イ|イールサン)チ",
  commentary: "ア(キ|イ|イールサン)チの(キ|イ|イールサン)は、キ, イ, イールサンのどれかの文字を表します。そのため、ア(キ|イ|イールサン)チは、アキチ, アイチ, アイールサンチを表す正規表現であると分かります。ア([キイ]|イールサン)チ,  ア.+?チでもOKです。",
  difficulty_level: "初級"
)

# 7問目
Question.create!(
  sentence: "すもものうち, すもももものうち, すもももももももものうちの全てにマッチする正規表現を入力せよ。",
  target_sentence: "すもものうち すもももものうち すもももももももものうち",
  sample_answer: "す.+?のうち",
  commentary: "す.+?のうちの.+は、一文字以上の文字列を表します。?を後ろにつけることでマッチの範囲を最短にできます。そのため、す.+?のうちは、すもものうち すもももものうち すもももももももものうちを表す正規表現であることが分かります。",
  difficulty_level: "初級"
)

# 8問目
Question.create!(
  sentence: "アイス ザイス イスの全てにマッチする正規表現を入力せよ",
  target_sentence: "アイス ザイス イス",
  sample_answer: "[アザ]?イス",
  commentary: "[アザ]?イスの[アザ]は、ア, ザのどれか1文字を表します。また、?をつけることで、直前の文字がマッチ対象の文字列に含まれなくてもOKになります。そのため、[アザ]?イスは、アイス, ザイス, イスを表す正規表現であると分かります。",
  difficulty_level: "初級"
)

# 9問目
Question.create!(
  sentence: "アタッチ アプローチ アパッチの全てにマッチする正規表現を入力せよ",
  target_sentence: "アタッチ アプローチ アパッチ",
  sample_answer: "ア(タッ|プロー|パッ)チ",
  commentary: "ア(タッ|プロー|パッ)チの(タッ|プロー|パッ)は、タッ, プロー, パッのどれかの文字を表します。そのため、ア(タッ|プロー|パッ)チは、アタッチ, アプローチ, アパッチを表す正規表現であることが分かります。ア.+?チでもOKです。",
  difficulty_level: "初級"
)

# 10問目
Question.create!(
  sentence: "ルネッサンス ルームサービス ルーフテラスの全てにマッチする正規表現を入力せよ",
  target_sentence: "ルネッサンス ルームサービス ルーフテラス",
  sample_answer: "ル(ネッサン|ームサービ|ーフテラ)ス",
  commentary: "ル(ネッサン|ームサービ|ーフテラ)スの(ネッサン|ームサービ|ーフテラ)は、ネッサン, ームサービ, ーフテラのどれかの文字を表します。そのため、ル(ネッサン|ームサービ|ーフテラ)スは、ルネッサンス, ルームサービス, ルーフテラスを表す正規表現であることが分かります。ル.+?スで書き換え可能です",
  difficulty_level: "初級"
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
  5.times do |m|
    game_management = user.game_managements.build(
      difficulty_level: :初級,
      game_result: :win,
      result_time: "00:04:3#{m}",
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
