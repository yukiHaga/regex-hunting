Question.seed(
  # 1問目
  {
    id: 1,
    sentence: '1, 5, 9にマッチする正規表現を入力せよ。',
    target_sentence: '1, 5, 9',
    sample_answer: '\\d',
    hint: '1桁の数字を表すメタ文字を使って、正規表現を作ってみましょう。',
    commentary: '\\dは1桁の数字を表します。[0-9]で書き換え可能です。',
    difficulty: 'elementary'
  },

  # 2問目
  {
    id: 2,
    sentence: '10, 20, 30にマッチする正規表現を入力せよ。',
    target_sentence: '10, 20, 30',
    sample_answer: '\\d{2}',
    hint: '\\d{n}は、n桁の数字を表すメタ文字です。\\d{n}を使って、正規表現を作ってみましょう。',
    commentary: '\\d{2}は2桁の数字を表します。\\d+でマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 3問目
  {
    id: 3,
    sentence: '100, 1000, 10000にマッチする正規表現を入力せよ。',
    target_sentence: '100, 1000, 10000',
    sample_answer: '\\d{3,5}',
    hint: '\\d{n,m}は、n桁~m桁の数字を表すメタ文字です。\\d{n,m}を使って、正規表現を作ってみましょう。',
    commentary: '\\d{3,5}は3桁~5桁の数字を表します。\\d+でマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 4問目
  {
    id: 4,
    sentence: '1000, 10000, 100000にマッチする正規表現を入力せよ。',
    target_sentence: '10, 100, 1000, 10000, 100000',
    sample_answer: '\\d{4,6}',
    hint: '\\d{n,m}は、n桁~m桁の数字を表すメタ文字です。\\d{n,m}を使って、正規表現を作ってみましょう。',
    commentary: '\\d{4,6}は4桁~6桁の数字を表します。\\d{4,}でマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 5問目
  {
    id: 5,
    sentence: 'A, B, Zにマッチする正規表現を入力せよ。',
    target_sentence: 'A, B, Z',
    sample_answer: '[ABZ]',
    hint: '[ABC]は、A, B, Cのどれか1文字を表すメタ文字です。[ABC]を使って、正規表現を作ってみましょう。',
    commentary: '[ABZ]はA, B, Zのどれか1文字を表します。[A-Z]でマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 6問目
  {
    id: 6,
    sentence: 'A, 9, Zにマッチする正規表現を入力せよ。',
    target_sentence: 'A, 9, Z',
    sample_answer: '[A9Z]',
    hint: "[ABC]は、A, B, Cのどれか1文字を表すメタ文字です。[ABC]を使って、正規表現を作
  ってみましょう。",
    commentary: '[A9Z]はA, 9, Zのどれか1文字を表します。\\wでマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 7問目
  {
    id: 7,
    sentence: 'A, a, 9にマッチする正規表現を入力せよ。',
    target_sentence: 'A, a, 9',
    sample_answer: '\\w',
    hint: '大文字アルファベット1文字, 小文字アルファベット1文字, 数字1文字を表すメタ文字を使って、正規表現を作ってみましょう。 ',
    commentary: '\\wはa~z, A~Z, 0~9, _の中の1文字を表します。[a-zA-Z\\d]で書き換え可能です。',
    difficulty: 'elementary'
  },

  # 8問目
  {
    id: 8,
    sentence: 'aaa, aaaa, aaaaaにマッチする正規表現を入力せよ。',
    target_sentence: 'aaa, aaaa, aaaaa, a, aa',
    sample_answer: 'a{3,5}',
    hint: '{n,m}は、直前の文字がn個以上、m個以下を表すメタ文字です。{n,m}を使って、正規表現を作ってみましょう。',
    commentary: 'a{3,5}はaaa, aaaa, aaaaaを表します。',
    difficulty: 'elementary'
  },

  # 9問目
  {
    id: 9,
    sentence: 'X, y, Zにマッチする正規表現を入力せよ。',
    target_sentence: 'X, y, Z',
    sample_answer: '[XyZ]',
    hint: '[ABC]は、A, B, Cのどれか1文字を表すメタ文字です。[ABC]を使って、正規表現を作ってみましょう。',
    commentary: '[XyZ]はX, y, Zを表します。\\w, [a-zA-Z]でマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 10問目
  {
    id: 10,
    sentence: 'xxx, yyy, zzzにマッチする正規表現を入力せよ。',
    target_sentence: 'xxx, yyy, zzz',
    sample_answer: 'xxx|yyy|zzz',
    hint: 'aaa|bbb|cccは、aaa, bbb, cccを表すメタ文字です。aaa|bbb|cccを使って、正規表現を作ってみましょう。',
    commentary: 'xxx|yyy|zzzはxxx, yyy, zzzを表します。[a-z]{3}でマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 11問目
  {
    id: 11,
    sentence: 'aaa, baaa, caにマッチする正規表現を入力せよ。',
    target_sentence: 'aaa, baaa, ca',
    sample_answer: 'aaa|baaa|ca',
    hint: 'aaa|bbb|cccは、aaa, bbb, cccを表すメタ文字です。aaa|bbb|cccを使って、正規表現を作ってみましょう。',
    commentary: 'aaa|baaa|caはaaa, baaa, caを表します。[a-z]{2,4}で書き換え可能です。',
    difficulty: 'elementary'
  },

  # 12問目
  {
    id: 12,
    sentence: 'aaa, 999, cccにマッチする正規表現を入力せよ。',
    target_sentence: 'aaa, 999, ccc, zzz',
    sample_answer: 'aaa|999|ccc',
    hint: 'aaa|bbb|cccは、aaa, bbb, cccを表すメタ文字です。aaa|bbb|cccを使って、正規表現を作ってみましょう。',
    commentary: 'aaa|999|cccはaaa, 999, cccを表します。',
    difficulty: 'elementary'
  },

  # 13問目
  {
    id: 13,
    sentence: '#, %, @にマッチする正規表現を入力せよ。',
    target_sentence: '#, %, @',
    sample_answer: '[#%@]',
    hint: '[ABC]は、A, B, Cのどれか1文字を表すメタ文字です。[ABC]を使って、正規表現を作ってみましょう。',
    commentary: '[#%@]は#, %, @を表します。',
    difficulty: 'elementary'
  },

  # 14問目
  {
    id: 14,
    sentence: 'xxx, yyy, zzzにマッチする正規表現を入力せよ。',
    target_sentence: 'xxx, yyy, zzz, ddd, eee',
    sample_answer: 'xxx|yyy|zzz',
    hint: 'aaa|bbb|cccは、aaa, bbb, cccを表すメタ文字です。aaa|bbb|cccを使って、正規表現を作ってみましょう。',
    commentary: 'xxx|yyy|zzzはxxx, yyy, zzzを表します。[xyz]{3}でマッチさせることもできます。',
    difficulty: 'elementary'
  },
)

