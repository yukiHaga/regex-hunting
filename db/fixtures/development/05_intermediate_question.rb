Question.seed(
  # 1問目
  {
    id: 15,
    sentence: 'argument, arguementにマッチする正規表現を入力せよ。',
    target_sentence: 'argument arguement',
    sample_answer: 'argue?ment',
    hint: '量指定子(「?」)と文字列を使用して、正規表現を作ってみましょう。',
    commentary: '「e?」は、eまたはなしを表します。そのため、「argue?ment」でargument, arguementにマッチするような正規表現を表します。「argument|arguement」または「argu(m|em)ent」でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 2問目
  {
    id: 16,
    sentence: 'environment, enviromentにマッチする正規表現を入力せよ。',
    target_sentence: 'environment enviroment',
    sample_answer: 'environ?ment',
    hint: '量指定子(「?」)と文字列を使用して、正規表現を作ってみましょう。',
    commentary: '「n?」は、nまたはなしを表します。そのため、「environ?ment」でenvironment, enviromentにマッチするような正規表現を表します。「environment|enviroment」または「enviro(nm|m)ent」でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 3問目
  {
    id: 17,
    sentence: '<html>, <h>, <p>, <span>にマッチする正規表現を入力せよ',
    target_sentence: '<html> <h> <p> <span>',
    sample_answer: '<[a-z]+>',
    hint: '文字クラスと量指定子(「+」)を使用して、正規表現を作ってみましょう。',
    commentary: '「[a-z]+」はaからzの1文字が1文字以上を表します。そのため、「<[a-z]+>」で<html>, <h>, <p>, <span>にマッチするような正規表現を表します。 「<\\w+>」でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 4問目
  {
    id: 18,
    sentence: '<html>, <h>, <p>, <span>, <h5>, <h6>にマッチする正規表現を入力せよ。',
    target_sentence: '<html> <h> <p> <span> <h5> <h6>',
    sample_answer: '<[a-z]+[1-6]?>',
    hint: '文字クラスと量指定子を使用して、正規表現を作ってみましょう。',
    commentary: '「[1-6]?」は、1から6の1桁の数字またはなしを表します。そのため、「<[a-z]+[1-6]?>」で<html>, <h>, <p>, <span>, <h5>, <h6>にマッチするような正規表現を表します。「<[a-z56]+>」または「<[a-z1-6]+>」でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 5問目
  {
    id: 19,
    sentence: '<p>, <p class=\"red\">, <p class=\"blue\">にマッチする正規表現を入力せよ。',
    target_sentence: '<p> <p class=\"red\"> <p class=\"blue\">',
    sample_answer: '<p( class=\"[a-z]+\")?>',
    hint: '文字列, 括弧, 文字クラス, 量指定子を使用して、正規表現を作ってみましょう。',
    commentary: '<p>と、属性値を持つ<p>がターゲットテキストです。属性値を持つまたは持たないという条件から、ターゲットテキストにマッチできる正規表現は、「<p(...)?>」という形であることが予想できます。class=\"...\"の部分は、「class=\"[a-z]+\"」で表すことができます。そのため、「<p( class=\"[a-z]+\")?>」で<p>, <p class=\"red\">, <p class=\"blue\">にマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 6問目
  {
    id: 20,
    sentence: '150, 15にマッチする正規表現を入力せよ。',
    target_sentence: '150 is greater than 15.',
    sample_answer: '\\d{2,3}',
    hint: "1桁の数字を表す特殊文字と量指定子(「{min,max}」)を使用して、正規表現を作ってみましょう。",
    commentary: '150は3桁の数字であり、15は2桁の数字です。そのため、正規表現「\\d{2,3}」でマッチさせることができます。量指定子「?」は、直前の1文字またはなしを表すので、「150?」でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 7問目
  {
    id: 21,
    sentence: '4桁以上の数字にマッチする正規表現を入力せよ。',
    target_sentence: '1 10 100 1000 10000 100000',
    sample_answer: '\\d{4,}',
    hint: '1桁の数字を表す特殊文字と量指定子(「{min,}」)を使用して、正規表現を作ってみましょう。',
    commentary: '「\\d{4,}」で1000, 10000, 100000にマッチするような正規表現を表します。「[0-9]{4,}」または「1000(0*)」でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 8問目
  {
    id: 22,
    sentence: '34, 55, 89, 144にマッチする正規表現を入力せよ。',
    target_sentence: '8 13 21 34 55 89 144',
    sample_answer: '1?[3-9]\d',
    hint: '量指定子(「?」)と文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '1桁目は任意の数字、2桁目は3から9、3桁目は1またはなしという条件がターゲットテキストから読み取れます。したがって、「1?[3-9]\d」で34, 55, 89, 144にマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 9問目
  {
    id: 23,
    sentence: '3から8にマッチする正規表現を入力せよ。',
    target_sentence: '0 1 2 3 4 5 6 7 8 9',
    sample_answer: '[3-8]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[3-8]は3から８のどれか1つの数字を表します。',
    difficulty: 'intermediate'
  },

  # 10問目
  {
    id: 24,
    sentence: '3から8, アルファベット, #にマッチする正規表現を入力せよ。',
    target_sentence: '2 3 4 5 6 7 8 9 A B C D E F a b c d e f #',
    sample_answer: '[3-8A-Fa-f#]',
    hint: '文字クラス内で範囲を複数指定して、正規表現を作ってみましょう。',
    commentary: '[3-8A-Fa-f#]は3から8, アルファベット, #のどれか1文字を表します。',
    difficulty: 'intermediate'
  },

  # 11問目
  {
    id: 25,
    sentence: '6から8, ., アルファベットにマッチする正規表現を入力せよ。',
    target_sentence: '6 7 8 . q r s Q R S',
    sample_answer: '[6-8q-sQ-S.]',
    hint: '文字クラス内で範囲を複数指定して、正規表現を作ってみましょう。',
    commentary: '[6-8q-sQ-S.]は6から8, ., アルファベットのどれか1文字を表します。',
    difficulty: 'intermediate'
  },

  # 12問目
  {
    id: 26,
    sentence: '1から3, アルファベット, #にマッチする正規表現を入力せよ。',
    target_sentence: '1 2 3 A B C #',
    sample_answer: '[1-3A-C#]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[1-3A-C#]は1から3, アルファベット, #のどれか1文字を表します。',
    difficulty: 'intermediate'
  },

  # 13問目
  {
    id: 27,
    sentence: '#, %, @にマッチする正規表現を入力せよ。',
    target_sentence: '# % @',
    sample_answer: '[#%@]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[#%@]は#, %, @のどれか1文字を表します。',
    difficulty: 'intermediate'
  },

  # 14問目
  {
    id: 28,
    sentence: 'sey以外の単語にマッチする正規表現を入力せよ。',
    target_sentence: 'set sed sey sec',
    sample_answer: 'se[^y]',
    hint: '文字列と否定文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[^y]はy以外の1文字を表します。そのため、se[^y]でset, sed, secにマッチするような正規表現を表します。se[tdc]でマッチさせることもできます。',
    difficulty: 'intermediate'
  },
)
