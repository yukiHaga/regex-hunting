Question.seed(
  # 1問目
  {
    id: 1,
    sentence: '1, 5, 9にマッチする正規表現を入力せよ。',
    target_sentence: '1 5 9',
    sample_answer: '\\d',
    hint: '1桁の数字を表す特殊文字を使用して、正規表現を作ってみましょう。',
    commentary: '\\dは1桁の数字を表します。[0-9]または[159]でマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 2問目
  {
    id: 2,
    sentence: 'a, c, zにマッチする正規表現を入力せよ。',
    target_sentence: 'a c z',
    sample_answer: '[a-z]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[a-z]は1文字の小文字アルファベットを表します。[acz]または\\wでマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 3問目
  {
    id: 3,
    sentence: 'b, c, fにマッチする正規表現を入力せよ',
    target_sentence: 'b c f',
    sample_answer: '[bcf]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[bcf]はb, c, fのどれか1文字を表します。[a-z]または\\wでマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 4問目
  {
    id: 4,
    sentence: '1, -, 9にマッチする正規表現を入力せよ。',
    target_sentence: '1 - 9',
    sample_answer: '[-19]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。特に-の位置に気をつけましょう。',
    commentary: '[-19]は-, 1, 9のどれか1文字を表します。[19-]または[-\d]でマッチさせることもできます。-を文字クラスの真ん中に配置([1-9])すると1桁の数字を表すので、1, -, 9にマッチしません。',
    difficulty: 'elementary'
  },

  # 5問目
  {
    id: 5,
    sentence: '^, c, dにマッチする正規表現を入力せよ。',
    target_sentence: '^ c d',
    sample_answer: '[cd^]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。特に^の位置に気をつけましょう。',
    commentary: '[cd^]はc, d, ^のどれか1文字を表します。[c^d]または[\w^]でマッチさせることもできます。^を文字クラスの先頭に配置([^cd])するとc, d以外の1文字を表すので、^, c, dにマッチしません。',
    difficulty: 'elementary'
  },

  # 6問目
  {
    id: 6,
    sentence: 'cat, can, cadにマッチする正規表現を入力せよ。',
    target_sentence: 'cat can car cad',
    sample_answer: 'ca[tnd]',
    hint: "文字列と文字クラスを使用して、正規表現を作ってみましょう。",
    commentary: '[tnd]はt, n, dのどれか1文字を表します。そのため、ca[tnd]でcat, can, cadにマッチするような正規表現を表します。ca[^r]でマッチさせることもできます。',
    difficulty: 'elementary'
  },

  # 7問目
  {
    id: 7,
    sentence: 'wax, wan, wayにマッチする正規表現を入力せよ。',
    target_sentence: 'win wax wan way',
    sample_answer: 'wa[xny]',
    hint: '文字列と文字クラスを使用して、正規表現を作ってみましょう。 ',
    commentary: '[xny]はx, n, yのどれか1文字を表します。そのため、wa[xny]でwax, wan, wayにマッチするような正規表現を表します。',
    difficulty: 'elementary'
  },

  # 8問目
  {
    id: 8,
    sentence: '(, \\, *にマッチする正規表現を入力せよ。',
    target_sentence: '( \\ *',
    sample_answer: '[(\\\\*]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。特にエスケープに気をつけましょう',
    commentary: '[(\\\\*]は(, \\, *のどれか1文字を表します。\\をそのまま使うと文字列として認識されません。そのため、\\を文字列として使いたい場合、\\で\\をエスケープします。',
    difficulty: 'elementary'
  },

  # 9問目
  {
    id: 9,
    sentence: '3から8にマッチする正規表現を入力せよ。',
    target_sentence: '0 1 2 3 4 5 6 7 8 9',
    sample_answer: '[3-8]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[3-8]は3から８のどれか1つの数字を表します。',
    difficulty: 'elementary'
  },

  # 10問目
  {
    id: 10,
    sentence: '3から8, アルファベット, #にマッチする正規表現を入力せよ。',
    target_sentence: '2 3 4 5 6 7 8 9 A B C D E F a b c d e f #',
    sample_answer: '[3-8A-Fa-f#]',
    hint: '文字クラス内で範囲を複数指定して、正規表現を作ってみましょう。',
    commentary: '[3-8A-Fa-f#]は3から8, アルファベット, #のどれか1文字を表します。',
    difficulty: 'elementary'
  },

  # 11問目
  {
    id: 11,
    sentence: '6から8, ., アルファベットにマッチする正規表現を入力せよ。',
    target_sentence: '6 7 8 . q r s Q R S',
    sample_answer: '[6-8q-sQ-S.]',
    hint: '文字クラス内で範囲を複数指定して、正規表現を作ってみましょう。',
    commentary: '[6-8q-sQ-S.]は6から8, ., アルファベットのどれか1文字を表します。',
    difficulty: 'elementary'
  },

  # 12問目
  {
    id: 12,
    sentence: '1から3, アルファベット, #にマッチする正規表現を入力せよ。',
    target_sentence: '1 2 3 A B C #',
    sample_answer: '[1-3A-C#]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[1-3A-C#]は1から3, アルファベット, #のどれか1文字を表します。',
    difficulty: 'elementary'
  },

  # 13問目
  {
    id: 13,
    sentence: '#, %, @にマッチする正規表現を入力せよ。',
    target_sentence: '# % @',
    sample_answer: '[#%@]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[#%@]は#, %, @のどれか1文字を表します。',
    difficulty: 'elementary'
  },

  # 14問目
  {
    id: 14,
    sentence: 'sey以外の単語にマッチする正規表現を入力せよ。',
    target_sentence: 'set sed sey sec',
    sample_answer: 'se[^y]',
    hint: '文字列と否定文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[^y]はy以外の1文字を表します。そのため、se[^y]でset, sed, secにマッチするような正規表現を表します。se[tdc]でマッチさせることもできます。',
    difficulty: 'elementary'
  },
)
