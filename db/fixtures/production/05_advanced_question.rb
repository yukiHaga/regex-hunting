Question.seed(
  # 1問目
  {
    id: 29,
    sentence: 'This is React, This is JavaScriptにマッチする正規表現を入力せよ。',
    target_sentence: 'This is React This is JavaScript',
    sample_answer: 'This is (React|JavaScript)',
    hint: '文字列, 選択, キャプチャグループを使用して、正規表現を作ってみましょう。',
    commentary: 'This is ReactとThis is JavaScriptの共通している文字列は、This isです。共通していない文字列はReactとJavaScriptです。ReactとJavaScriptにマッチする正規表現は、React|JavaScriptです。This is React|JavaScriptとすると、This is ReactまたはJavaScriptにしかマッチしません。そのため、キャプチャグループをつけて選択の範囲を限定します。したがって、This is (React|JavaScript)でThis is React, This is JavaScriptにマッチする正規表現を表します。This is [A-Z][a-zA-Z]+でマッチさせることもできます。しかし、This is Pythonという文字列にもマッチしてしまう為、注意が必要です。',
    difficulty: 'advanced'
  },

  # 2問目
  {
    id: 30,
    sentence: '100yenの100にマッチする正規表現を入力せよ。',
    target_sentence: 'This water(100ml) is 100yen',
    sample_answer: '\\d{3}(?=yen)',
    hint: '\\d, 量指定子, 肯定の先読みを使用して、正規表現を作ってみましょう。',
    commentary: '\\d{3}をターゲット文字列に適用させると、100mlの100にもマッチしてしまいます。yenという文字列が後ろにある100にマッチさせたい為、肯定の先読みを使用します。\\d{3}(?=yen)をターゲット文字列に適用させた場合を考えます。\\d{3}で100にマッチした後、(?=yen)で100の後ろの文字列がyenにマッチするかを調べます。マッチした場合、全体の正規表現が成功します。肯定の先読みの最終的なマッチ結果は位置を表す為、肯定の先読みでマッチさせた文字列は全体の正規表現のマッチ結果に含まれません。したがって、\\d{3}(?=yen)で100yenの100にマッチする正規表現を表します。',
    difficulty: 'advanced'
  },

  # 3問目
  {
    id: 31,
    sentence: '171-0022, 101-0051にマッチする正規表現を入力せよ',
    target_sentence: '000-0000 171-0022 101-0051',
    sample_answer: '(?!0{3}-0{4})\\d{3}-\\d{4}',
    hint: '否定の先読み, 量指定子, \\dを使用して、正規表現を作ってみましょう。',
    commentary: '全ての文字列に共通していることは、-の前が3桁の数字, -の後が4桁の数字ということです。000-0000にマッチさせないようにするためには、否定の先読みを使います。否定の先読みを使うことで、ある文字列を含まないようなマッチができます。今回の場合、(?!0{3}-0{4})で文字列が000-0000ではないかを調べることができます。否定の先読みが成功した後、ターゲット文字列が\\d{3}-\\d{4}にマッチするかを試行します。したがって、(?!0{3}-0{4})\\d{3}-\\d{4}で171-0022, 101-0051にマッチする正規表現を表します。',
    difficulty: 'advanced'
  },

  # 4問目
  {
    id: 32,
    sentence: '先頭のcatにマッチする正規表現を入力せよ。',
    target_sentence: 'cat dog cat',
    sample_answer: '^cat',
    hint: 'アンカー, 文字列を使用して、正規表現を作ってみましょう。',
    commentary: '正規表現catをターゲット文字列に適用させると、後ろのcatにもマッチしてしまいます。そのため、アンカー(^)を使用します。^は行の先頭位置にマッチする為、全体の正規表現のマッチを行頭に固定することができます。したがって、^catで先頭のcatにマッチする正規表現を表します。',
    difficulty: 'advanced'
  },

  # 5問目
  {
    id: 33,
    sentence: '末尾のcatにマッチする正規表現を入力せよ。',
    target_sentence: 'cat dog cat',
    sample_answer: 'cat$',
    hint: '文字列, アンカーを使用して、正規表現を作ってみましょう。',
    commentary: '正規表現catをターゲット文字列に適用させると、先頭のcatにもマッチしてしまいます。そのため、アンカー($)を使用します。$は行の末尾位置にマッチする為、全体の正規表現のマッチを末尾に固定することができます。したがって、cat$で末尾のcatにマッチする正規表現を表します。',
    difficulty: 'advanced'
  },

  # 6問目
  {
    id: 34,
    sentence: '単体のcatにマッチする正規表現を入力せよ。',
    target_sentence: 'dog cat cats indicate',
    sample_answer: '\\bcat\\b',
    hint: "単語境界(\\b), 文字列を使用して、正規表現を作ってみましょう。",
    commentary: '正規表現catをターゲット文字列に適用させると、catsやindicate内のcatにもマッチしてしまいます。そのため、単語境界(\\b)を使用します。\\bとcatを併用することで、単語内のcatにマッチするのを防げます。したがって、\\bcat\\bで単体のcatにマッチする正規表現を表します。cat(?![se])でマッチさせることもできます。',
    difficulty: 'advanced'
  },

  # 7問目
  {
    id: 35,
    sentence: 'Vue.js React.js Node.jsにマッチする正規表現を入力せよ。',
    target_sentence: 'Vue.js React.js Node.js Express.js',
    sample_answer: '(Vue|React|Node)\.js',
    hint: 'キャプチャグループ, 選択, 文字列を使用して、正規表現を作ってみましょう。',
    commentary: 'Vue, React, Nodeのどれかにマッチさせたい場合、Vue|React|Nodeという正規表現を使用します。それぞれのマッチさせたい文字列に.jsが付いている為、Vue|React|Nodeの後ろに\\.jsを付け足します。この時、キャプチャグループを忘れると、Vue, React, Node.jsにマッチする正規表現を表してしまいます。したがって、(Vue|React|Node)\.jsでVue.js React.js Node.jsにマッチする正規表現を表します。',
    difficulty: 'advanced'
  },

  # 8問目
  {
    id: 36,
    sentence: '2番目のcatにマッチする正規表現を入力せよ。',
    target_sentence: 'cat cat dog',
    sample_answer: '(?!^)cat',
    hint: '否定の先読み, 文字列を使用して、正規表現を作ってみましょう。',
    commentary: '正規表現catをターゲット文字列に適用させると、先頭のcatにもマッチしてしまいます。そのため、否定の先読みを使用します。(?!^)は、ターゲット文字列が先頭位置(^)にマッチしないかを試行します。もしマッチしない場合、否定の先読みが成功し、マッチを試行開始した位置にマッチします。したがって、(?!^)catで2番目のcatにマッチする正規表現を表します。',
    difficulty: 'advanced'
  },

  # 9問目
  {
    id: 37,
    sentence: 'cats内のcatにマッチする正規表現を入力せよ。',
    target_sentence: 'dog cats cat',
    sample_answer: '(?=cats)cat',
    hint: '肯定の先読み, 文字列を使用して、正規表現を作ってみましょう。',
    commentary: '正規表現catをターゲット文字列に適用させると、末尾のcatにもマッチしてしまいます。そのため、肯定の先読みを使用します。(?=cats)は、ターゲット文字列がcatsという文字列にマッチするかを試行します。もしマッチする場合、マッチを試行開始した位置にマッチします。その位置から、catをマッチさせれば、cats内のcatにマッチさせることができます。したがって、(?=cats)catでcats内のcatにマッチする正規表現を表します。cat(?=s)でcats内のcatにマッチさせることもできます。',
    difficulty: 'advanced'
  },

  # 10問目
  {
    id: 38,
    sentence: 'concat内のconにマッチする正規表現を入力せよ。',
    target_sentence: 'const concat concentrate',
    sample_answer: '(?=concat)con',
    hint: '肯定の先読み, 文字列を使用して、正規表現を作ってみましょう。',
    commentary: '正規表現conをターゲット文字列に適用させると、全てのconにマッチしてしまいます。そのため、肯定の先読みを使用します。(?=concat)は、ターゲット文字列がconcatという文字列にマッチするかを試行します。もしマッチする場合、マッチを試行開始した位置にマッチします。その位置から、conをマッチさせれば、concat内のconにマッチさせることができます。したがって、(?=concat)conでconcat内のconにマッチする正規表現を表します。con(?=cat)でマッチさせることもできます。',
    difficulty: 'advanced'
  },

  # 11問目
  {
    id: 39,
    sentence: 'regex.com, regex.jpにマッチする正規表現を入力せよ。',
    target_sentence: 'regex.com regex.jp regex.org ',
    sample_answer: 'regex\.(com|jp)',
    hint: '文字列, キャプチャグループ, 選択を使用して、正規表現を作ってみましょう。',
    commentary: 'regex.comとregex.jpの共通している文字列は、regexです。共通していない文字列は、comとjpです。comとjpの部分はcom|jpでマッチさせることができます。regex\.com|jpだとregex.comまたはjpにマッチする正規表現を表してしまいます。そのため、キャプチャグループをつけます。したがって、regex\.(com|jp)でregex.com, regex.jpにマッチする正規表現を表します。',
    difficulty: 'advanced'
  },

  # 12問目
  {
    id: 40,
    sentence: 'constとconcat内のconにマッチする正規表現を入力せよ。',
    target_sentence: 'const concat concentrate',
    sample_answer: '(?!concentrate)con',
    hint: '否定の先読み, 文字列を使用して、正規表現を作ってみましょう。',
    commentary: 'constとconcat内のconにマッチさせるとは、つまり、concentrate内のcon以外のconにマッチさせると言い換えることができます。そのような場合、否定の先読み(?!concentrate)を使用することで、concentrateをconのマッチ対象外にすることができます。したがって、(?!concentrate)conでconstとconcat内のconにマッチする正規表現を表します。con(?=st|cat)でマッチさせることもできます。',
    difficulty: 'advanced'
  },

  # 13問目
  {
    id: 41,
    sentence: 'indicate内のcatにマッチする正規表現を入力せよ。',
    target_sentence: 'dog cat cats indicate',
    sample_answer: 'cat(?=e)',
    hint: '文字列, 肯定の先読みを使用して、正規表現を作ってみましょう。',
    commentary: '正規表現catをターゲット文字列に適用させると、全てのcatにマッチしてしまいます。そのため、肯定の先読みを使用します。(?=e)は、ターゲット文字列がeという文字列にマッチするかを試行します。もしマッチした場合、マッチを試行開始した位置にマッチします。したがって、cat(?=e)でindicate内のcatにマッチする正規表現を表します。',
    difficulty: 'advanced'
  },

  # 14問目
  {
    id: 42,
    sentence: '先頭の171-0022にマッチする正規表現を入力せよ。',
    target_sentence: '171-0022 171-0022 171-0022',
    sample_answer: '^171-0022',
    hint: 'アンカー, 数字を使用して、正規表現を作ってみましょう。',
    commentary: '正規表現171-0022をターゲット文字列に適用させると、全ての171-0022にマッチしてしまいます。そのため、アンカー(^)を使用します。^は行の先頭位置にマッチする為、全体の正規表現のマッチを行頭に固定することができます。したがって、^171-0022で先頭の171-0022にマッチする正規表現を表します。',
    difficulty: 'advanced'
  },
)
