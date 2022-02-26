Question.seed(
  # 1問目
  {
    id: 15,
    sentence: 'argument, arguementにマッチする正規表現を入力せよ。',
    target_sentence: 'argument arguement',
    sample_answer: 'argue?ment',
    hint: '文字列と量指定子(?)を使用して、正規表現を作ってみましょう。',
    commentary: 'e?は、eまたはなしを表します。そのため、argue?mentでargument, arguementにマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 2問目
  {
    id: 16,
    sentence: 'environment, enviromentにマッチする正規表現を入力せよ。',
    target_sentence: 'environment enviroment',
    sample_answer: 'environ?ment',
    hint: '文字列と量指定子(?)を使用して、正規表現を作ってみましょう。',
    commentary: 'n?は、nまたはなしを表します。そのため、environ?mentでenvironment, enviromentにマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 3問目
  {
    id: 17,
    sentence: '<html>, <p>, <span>にマッチする正規表現を入力せよ',
    target_sentence: '<html> <p> <span>',
    sample_answer: '<[a-z]+>',
    hint: '文字列, 文字クラス, 量指定子(+)を使用して、正規表現を作ってみましょう。',
    commentary: '[a-z]+はaからzの1文字が1文字以上を表します。そのため、<[a-z]+>で<html>, <p>, <span>にマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 4問目
  {
    id: 18,
    sentence: '<span>, <h5>, <h6>にマッチする正規表現を入力せよ。',
    target_sentence: '<span> <h5> <h6>',
    sample_answer: '<[a-z]+[1-6]?>',
    hint: '文字列, 文字クラス, 量指定子を使用して、正規表現を作ってみましょう。',
    commentary: '[1-6]?は、1から6の1桁の数字またはなしを表します。そのため、<[a-z]+[1-6]?>で<span>, <h5>, <h6>にマッチするような正規表現を表します。<[a-z56]+>または<[a-z1-6]+>でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 5問目
  {
    id: 19,
    sentence: '<p>, <p class={Blue}>にマッチする正規表現を入力せよ。',
    target_sentence: '<p> <p class={Blue}>',
    sample_answer: '<p(?: class={Blue})?>',
    hint: '文字列, 括弧, 文字クラス, 量指定子を使用して、正規表現を作ってみましょう。',
    commentary: '<p>と、属性値を持つ<p>がターゲットテキストです。属性値を持つまたは持たないという条件から、ターゲットテキストにマッチできる正規表現は、<p(...)?>という形であることが予想できます。そのため、<p(?: class={Blue})?>で<p>, <p class={Blue}>にマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 6問目
  {
    id: 20,
    sentence: '150, 15にマッチする正規表現を入力せよ。',
    target_sentence: '150 is greater than 15.',
    sample_answer: '\\d{2,3}',
    hint: "1桁の数字を表す特殊文字と量指定子({min,max})を使用して、正規表現を作ってみましょう。",
    commentary: '150は3桁の数字であり、15は2桁の数字です。そのため、正規表現\\d{2,3}でマッチさせることができます。量指定子?は、直前の1文字またはなしを表すので、150?でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 7問目
  {
    id: 21,
    sentence: '4桁以上の数字にマッチする正規表現を入力せよ。',
    target_sentence: '1 10 100 1000 10000 100000',
    sample_answer: '\\d{4,}',
    hint: '1桁の数字を表す特殊文字と量指定子({min,})を使用して、正規表現を作ってみましょう。',
    commentary: '\\d{4,}で1000, 10000, 100000にマッチするような正規表現を表します。[0-9]{4,}または1000(?:0*)でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 8問目
  {
    id: 22,
    sentence: '34, 55, 89, 144にマッチする正規表現を入力せよ。',
    target_sentence: '8 13 21 34 55 89 144',
    sample_answer: '1?[3-9]\d',
    hint: '量指定子(?)と文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '1桁目は任意の数字、2桁目は3から9、3桁目は1またはなしという条件がターゲットテキストから読み取れます。したがって、1?[3-9]\dで34, 55, 89, 144にマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 9問目
  {
    id: 23,
    sentence: '3, |, Aにマッチする正規表現を入力せよ。',
    target_sentence: '3 | A',
    sample_answer: '[3|A]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[3|A]は3, |, Aのどれか1つの文字を表します。そのため、正規表現[3|A]で3, |, Aにマッチさせることができます。注意点は、|を文字クラスの中で使用すると、ただの文字列として扱われることです。選択の意味はなくなります。',
    difficulty: 'intermediate'
  },

  # 10問目
  {
    id: 24,
    sentence: 'React, JavaScript にマッチする正規表現を入力せよ。',
    target_sentence: 'React is a JavaScript library',
    sample_answer: '[A-Z][a-zA-Z]+',
    hint: '文字クラス, 量指定子を使用して、正規表現を作ってみましょう。',
    commentary: 'Reactという文字列とJavaScriptという文字列に共通することは、先頭が大文字ということです。大文字1文字を表す正規表現は[A-Z]です。2文字目以降は大文字と小文字が存在するので、[a-zA-Z]と表すことができます。したがって、React, JavaScriptにマッチする正規表現は、[A-Z][a-zA-Z]+であることが分かります。',
    difficulty: 'intermediate'
  },

  # 11問目
  {
    id: 25,
    sentence: 'ck, cook, coook, cooookにマッチする正規表現を入力せよ。',
    target_sentence: 'ck cook coook cooook',
    sample_answer: 'co*k',
    hint: '文字列と量指定子(*)を使用して、正規表現を作ってみましょう。',
    commentary: 'ck, cook, coook, cooookの共通な文字列はc, kです。cとkの間のoの数が単語ごとに違います。任意の数のoは、o*で表すことができます。そのため、co*kでck, cook, coook, cooookにマッチする正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 12問目
  {
    id: 26,
    sentence: '1, 112, 11212, 1121212にマッチする正規表現を入力せよ。',
    target_sentence: '1 112 11212 1121212',
    sample_answer: '1(?:12)*',
    hint: '文字列, 括弧, 量指定子(*)を使用して、正規表現を作ってみましょう。',
    commentary: '全ての数は、先頭が1から始まります。その後、12が0回以上繰り返されています。そのため、1(?:12)*で1, 112, 11212, 1121212にマッチする正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 13問目
  {
    id: 27,
    sentence: '123, -110.9にマッチする正規表現を入力せよ。',
    target_sentence: '123 -110.9',
    sample_answer: '-?\\d{3}(?:\.\\d)?',
    hint: '\\d, 量指定子を使用して、正規表現を作ってみましょう。',
    commentary: 'マイナスがあるかないかは-?で表すことができます。マイナスと小数点との間には3桁の数字が存在するので、\\d{3}で表すことができます。小数点と小数第一位の数があるかないかは(?:\.\\d)?で表すことができます。.自体は任意の1文字を表すので、純粋に.として使いたい場合、\\でエスケープします。したがって、-?\\d{3}(?:\.\\d)?で-123, -110.9にマッチする正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 14問目
  {
    id: 28,
    sentence: 'Java, JavaScriptにマッチする正規表現を入力せよ。',
    target_sentence: 'Java JavaScript Python',
    sample_answer: 'Java(?:Script)?',
    hint: '文字列, 括弧, 量指定子(?)を使用して、正規表現を作ってみましょう。',
    commentary: 'Javaという文字列と、JavaScriptという文字列の違いは、Scriptという文字列があるかないかです。Scriptという文字列があるまたはなしは、(?:Script)?で表すことができます。そのため、Java(?:Script)?でJava, JavaScriptにマッチするような正規表現を表します。もし括弧をつけない場合、正規表現はJavaScript?となります。これは、JavaScript, JavaScripにマッチするだけであり、Javaにはマッチしません。?の対象はあくまで直前の1文字であるためです。括弧を使うことで、1文字以上の文字列を?の対象にすることができます。',
    difficulty: 'intermediate'
  },
)
