FactoryBot.define do
  factory :question do
    trait :elementary do
      sentence { '1, 5, 9にマッチする正規表現を入力せよ。' }
      target_sentence { '1 5 9' }
      sample_answer { '\\d' }
      hint { '1桁の数字にマッチする特殊文字を使用して、正規表現を作ってみましょう。' }
      commentary { '\\dは1桁の数字にマッチします。[0-9]または[159]でマッチさせることもできます。' }
      difficulty { 'elementary' }
    end
    trait :intermediate do
      sentence { 'argument, arguementにマッチする正規表現を入力せよ。' }
      target_sentence { 'argument arguement' }
      sample_answer { 'argue?ment' }
      hint { '文字列と量指定子(?)を使用して、正規表現を作ってみましょう。' }
      commentary { 'e?は、eがあればマッチするが、なくてもよいという意味です。そのため、argue?mentでargument, arguementにマッチするような正規表現を表します。' }
      difficulty { 'intermediate' }
    end
    trait :advanced do
      sentence { '100yenの100にマッチする正規表現を入力せよ。' }
      target_sentence { 'This water(100ml) is 100yen' }
      sample_answer { '\\d{3}(?=yen)' }
      hint { '\\d, 量指定子, 肯定の先読みを使用して、正規表現を作ってみましょう。' }
      commentary {
        '\\d{3}をターゲット文字列に適用させると、100mlの100にもマッチしてしまいます。yenという文字列が後ろにある100にマッチさせたい為、肯定の先読みを使用します。\\d{3}(?=yen)をターゲット文字列に適用させた場合を考えます。\\d{3}で100にマッチした後、(?=yen)で100の後ろの文字列がyenにマッチするかを調べます。マッチした場合、全体の正規表現が成功します。肯定の先読みの最終的なマッチ結果は位置を表す為、肯定の先読みでマッチさせた文字列は全体の正規表現のマッチ結果に含まれません。したがって、\\d{3}(?=yen)で100yenの100にマッチする正規表現を表します。'
      }
      difficulty { 'advanced' }
    end
  end
end
