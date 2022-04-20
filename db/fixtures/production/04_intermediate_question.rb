Question.seed(
  # 1問目
  {
    id: 15,
    sentence: 'argument, arguementにマッチする正規表現を入力せよ。',
    target_sentence: 'argument arguement',
    sample_answer: 'argue?ment',
    hint: '文字列と量指定子(?)を使用して、正規表現を作ってみましょう。',
    commentary: 'e?は、eがあればマッチするが、なくてもよいという意味です。そのため、argue?mentでargument, arguementにマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 2問目
  {
    id: 16,
    sentence: 'environment, enviromentにマッチする正規表現を入力せよ。',
    target_sentence: 'environment enviroment',
    sample_answer: 'environ?ment',
    hint: '文字列と量指定子(?)を使用して、正規表現を作ってみましょう。',
    commentary: 'n?は、nがあればマッチするが、なくてもよいという意味です。そのため、environ?mentでenvironment, enviromentにマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 3問目
  {
    id: 17,
    sentence: '195-3314, 195-33, 195#3にマッチする正規表現を入力せよ',
    target_sentence: '195-3314 195-33 195#3',
    sample_answer: '\\d{3}[-#]\\d{1,4}',
    hint: '\\d, 文字クラス, 量指定子を使用して、正規表現を作ってみましょう。',
    commentary: '-と#の前には3桁の数字があります。3桁の数字は\\d{3}でマッチさせることができます。-と#に関しては、[-#]でマッチさせることができます。-と#の後ろは1桁から4桁の数字です。1桁から4桁の数字は\\d{1,4}でマッチさせることができます。そのため、\\d{3}[-#]\\d{1,4}で195-3314, 195-33, 195#3にマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 4問目
  {
    id: 18,
    sentence: 'class, class={Blue}にマッチする正規表現を入力せよ。',
    target_sentence: 'class class={Blue}',
    sample_answer: 'class(={Blue})?',
    hint: '文字列, キャプチャグループ, 量指定子を使用して、正規表現を作ってみましょう。',
    commentary: 'classとclass={Blue}の共通している文字列はclassです。共通していない文字列は={Blue}です。={Blue}があるかないかの違いの為、={Blue}は(={Blue})?でマッチさせることを考えます。そのため、class(={Blue})?でclass, class={Blue}にマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 5問目
  {
    id: 19,
    sentence: 'color={BLUE}, background-color={red}にマッチする正規表現を入力せよ。',
    target_sentence: 'color={BLUE} background-color={red}',
    sample_answer: '(background-)?color={[a-zA-Z]+}',
    hint: '文字列, キャプチャグループ, 文字クラス, 量指定子を使用して、正規表現を作ってみましょう。',
    commentary: 'colorとbackgournd-colorという文字列の違いは、background-がついているかです。colorとbackgroud-は、(background-)?colorでマッチさせることができます。={BLUE}と={red}は={[a-zA-Z]+}でマッチさせることができます。そのため、(background-)?color={[a-zA-Z]+}でcolor={BLUE}, background-color={red}にマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 6問目
  {
    id: 20,
    sentence: '150, 15にマッチする正規表現を入力せよ。',
    target_sentence: '150 is greater than 15.',
    sample_answer: '150?',
    hint: "数字と量指定子(?)を使用して、正規表現を作ってみましょう。",
    commentary: '量指定子?は、直前の1文字があればマッチするが、なくてもよいを意味します。そのため、150?でマッチさせることができます。150は3桁の数字であり、15は2桁の数字であるため、正規表現\\d{2,3}でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 7問目
  {
    id: 21,
    sentence: '4桁以上の数字にマッチする正規表現を入力せよ。',
    target_sentence: '1 10 100 1000 10000 100000',
    sample_answer: '\\d{4,}',
    hint: '1桁の数字にマッチする特殊文字と量指定子({min,})を使用して、正規表現を作ってみましょう。',
    commentary: '\\d{4,}で1000, 10000, 100000にマッチするような正規表現を表します。[0-9]{4,}または1000(0*)でマッチさせることもできます。',
    difficulty: 'intermediate'
  },

  # 8問目
  {
    id: 22,
    sentence: '34, 55, 89, 144にマッチする正規表現を入力せよ。',
    target_sentence: '8 13 21 34 55 89 144',
    sample_answer: '1?[3-8]\d',
    hint: '量指定子(?)と文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '百の位は1またはなし、十の位は3から8、一の位は任意の数字という条件がターゲット文字列から読み取れます。したがって、1?[3-9]\dで34, 55, 89, 144にマッチするような正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 9問目
  {
    id: 23,
    sentence: '3, |, Aにマッチする正規表現を入力せよ。',
    target_sentence: '3 | A',
    sample_answer: '[3|A]',
    hint: '文字クラスを使用して、正規表現を作ってみましょう。',
    commentary: '[3|A]は3, |, Aのどれか1つの文字にマッチします。そのため、正規表現[3|A]で3, |, Aにマッチさせることができます。注意点は、|を文字クラスの中で使用すると、ただの文字列として扱われることです。選択の意味はなくなります。',
    difficulty: 'intermediate'
  },

  # 10問目
  {
    id: 24,
    sentence: 'React, JavaScript にマッチする正規表現を入力せよ。',
    target_sentence: 'React is a JavaScript library',
    sample_answer: '[A-Z][a-zA-Z]+',
    hint: '文字クラス, 量指定子を使用して、正規表現を作ってみましょう。',
    commentary: 'Reactという文字列とJavaScriptという文字列に共通することは、先頭が大文字ということです。大文字1文字を表す正規表現は[A-Z]です。2文字目以降の大文字と小文字は、[a-zA-Z]でマッチさせることができます。したがって、React, JavaScriptにマッチする正規表現は、[A-Z][a-zA-Z]+であることが分かります。',
    difficulty: 'intermediate'
  },

  # 11問目
  {
    id: 25,
    sentence: 'ck, cook, coook, cooookにマッチする正規表現を入力せよ。',
    target_sentence: 'ck cook coook cooook',
    sample_answer: 'co*k',
    hint: '文字列と量指定子(*)を使用して、正規表現を作ってみましょう。',
    commentary: 'ck, cook, coook, cooookの共通している文字列はc, kです。cとkの間のoの数が単語ごとに違います。任意の数のoは、o*でマッチさせることができます。そのため、co*kでck, cook, coook, cooookにマッチする正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 12問目
  {
    id: 26,
    sentence: '1, 112, 11212, 1121212にマッチする正規表現を入力せよ。',
    target_sentence: '1 112 11212 1121212',
    sample_answer: '1(12)*',
    hint: '文字列, キャプチャグループ, 量指定子(*)を使用して、正規表現を作ってみましょう。',
    commentary: '全ての数は、先頭が1から始まります。その後、12が0回以上繰り返されています。そのため、1(12)*で1, 112, 11212, 1121212にマッチする正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 13問目
  {
    id: 27,
    sentence: '123, -110.9にマッチする正規表現を入力せよ。',
    target_sentence: '123 -110.9',
    sample_answer: '-?\\d{3}(\.\\d)?',
    hint: '\\d, 量指定子を使用して、正規表現を作ってみましょう。',
    commentary: 'マイナスがあるかないかは-?で表すことができます。マイナスと小数点との間には3桁の数字は、\\d{3}でマッチさせることができます。小数点と小数第一位の数があるかないかは、(\.\\d)?でマッチさせることができます。.自体は任意の1文字にマッチする為、純粋に.として使いたい場合、\\でエスケープします。したがって、-?\\d{3}(\.\\d)?で-123, -110.9にマッチする正規表現を表します。',
    difficulty: 'intermediate'
  },

  # 14問目
  {
    id: 28,
    sentence: 'Java, JavaScriptにマッチする正規表現を入力せよ。',
    target_sentence: 'Java JavaScript Python',
    sample_answer: 'Java(Script)?',
    hint: '文字列, キャプチャグループ, 量指定子(?)を使用して、正規表現を作ってみましょう。',
    commentary: 'Javaという文字列と、JavaScriptという文字列の違いは、Scriptという文字列があるかないかです。Scriptという文字列があるまたはなしは、(Script)?でマッチさせることができます。そのため、Java(Script)?でJava, JavaScriptにマッチするような正規表現を表します。もしキャプチャグループをつけない場合、正規表現はJavaScript?となります。これは、JavaScript, JavaScripにマッチするだけであり、Javaにはマッチしません。?の対象はあくまで直前の1文字であるためです。キャプチャグループを使用することで、1文字以上の文字列を?の対象にすることができます。',
    difficulty: 'intermediate'
  },
)
