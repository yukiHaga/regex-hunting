// 文字クラスのデータ
export const characterClassesRows = [
  {
    id: 1, 
    name: '[...]', 
    data: '指定した文字のどれか1文字にマッチします。ハイフンを使用して文字の範囲を指定することもできます。文字クラスの中に\\d等を書くこともできます。', 
    example: '[aq],  [a-z],  [E\\d]'
  },
  {
    id: 2, 
    name: '[^...]', 
    data: '[^...]は否定文字クラスという特殊文字です。指定した文字以外の1文字にマッチします。例えば、[^A]はA以外の1文字、[^ABC]はA、B、C以外の1文字にマッチします。[^ABC]は[^A-C]に書き換え可能です。', 
    example: '[aq],  [a-z],  [E\\d]'
  },
  {
    id: 3, 
    name: '\\d', 
    data: '1桁の数字にマッチします。[0-9]で書き換え可能です。', 
    example: false
  },
  {
    id: 4, 
    name: '\\w', 
    data: 'アンダースコアを含む半角英数字1文字にマッチします。\\wは[A-Za-z0-9_]に書き換え可能です。', 
    example: false
  },
  {
    id: 5, 
    name: '.', 
    data: '行末文字(\\n、\\r、\\u2028、\\u2029)を除くあらゆる1文字にマッチします。注意すべきことは、文字クラス([...])内で.を使用すると、ただの文字列として扱われることです。', 
    example: false
  },
  {
    id: 6, 
    name: '\\s', 
    data: 'スペース、タブ、改ページ、改行を含むホワイトスペース文字にマッチします。', 
    example: false
  },
  {
    id: 7, 
    name: '\\t', 
    data: 'タブにマッチします。', 
    example: false
  },
  {
    id: 8, 
    name: '\\r', 
    data: '復帰文字にマッチします。', 
    example: false
  },
  {
    id: 9, 
    name: '\\n', 
    data: '改行文字にマッチします。', 
    example: false
  },
  {
    id: 10, 
    name: '\\D', 
    data: 'あらゆる数字以外の文字にマッチします。\\Dは[^0-9]に書き換え可能です。', 
    example: false
  },
  {
    id: 11, 
    name: '\\W', 
    data: 'アンダースコアを含む半角英数字以外の1文字にマッチします。\\Wは[^A-Za-z0-9_]に書き換え可能です。', 
    example: false
  },
  {
    id: 12, 
    name: '\\S', 
    data: 'ホワイトスペース以外の文字にマッチします。', 
    example: false
  },
  {
    id: 13, 
    name: '\\', 
    data: 'ある文字の前に\\を書くことで、ある文字をエスケープすることができます。エスケープ対象の文字が特殊文字であるか、または、エスケープ対象の文字と\\の組み合わせに特別な意味がなければ、エスケープ対象の文字が、ただの文字としてマッチするようになります。また、\\を文字列として扱いたい場合、\\を\\でエスケープします。', 
    example: false
  }
];

// 量指定子のデータ
export const quantifiersRows = [
  {
    id: 1, 
    name: '?', 
    data: '直前の1文字があればマッチさせるが、なくてもよいという意味を表します。1つの文字クラスは1つの単位を表すので、キャプチャグループを使用しなくても量指定子を指定することができます。2文字以上の文字列を繰り返しマッチさせたい場合、キャプチャグループで括ってから量指定子を指定します。', 
    example: 'n?,  [aq]?,  [a-z]?,  (Script)?'
  },
  {
    id: 2, 
    name: '+', 
    data: '直前の1文字に1回以上の繰り返しマッチという意味を表します。', 
    example: 'o+,  [a-z]+,  (12)+'
  },
  {
    id: 3, 
    name: '*', 
    data: '直前の1文字に0回以上の繰り返しマッチという意味を表します。', 
    example: 'o*,  [a-z]*,  (12)*'
  },
  {
    id: 4, 
    name: '{min}', 
    data: '直前の1文字にmin回繰り返しマッチという意味を表します。', 
    example: '\\d{3}'
  },
  {
    id: 5, 
    name: '{min,}', 
    data: '直前の1文字にmin回以上の繰り返しマッチという意味を表します。', 
    example: '\\d{3,}'
  },
  {
    id: 6, 
    name: '{min,max}', 
    data: '直前の1文字にmin回以上、max回以下の繰り返しマッチという意味を表します。', 
    example: '\\d{2,3}'
  },
  {
    id: 7, 
    name: '??', 
    data: '最大量指定子の後ろに?をつけると、最小量指定子になります。+や?等は最大量指定子であり、できる限り多くマッチしようと試みます。最小量指定子は最大量指定子の逆で、マッチする文字列が見つかれば、マッチを試行するのをやめます。', 
    example: 'ターゲット文字列がsome <foo> <bar> new </bar> </foo> thingの場合'
  }
];

// 括弧のデータ
export const groupsRows = [
  {
    id: 1, 
    name: '(...)', 
    data: 'キャプチャグループを使用する目的は、主に以下の3つです。', 
    example: false
  },
  {
    id: 2, 
    name: '\\n', 
    data: '\\nは、キャプチャした文字列を呼び出すときに使用します。', 
    example: 'ターゲット文字列がThis is "<span>React</span>"の場合'
  },
  {
    id: 3, 
    name: '(?:...)', 
    data: '(?:...)は、非キャプチャグループです。キャプチャグループのキャプチャ機能がないバージョンです。主に1つのグループを作りたい時に使用します。', 
    example: false
  },
  {
    id: 4, 
    name: '(?<Name>...)', 
    data: '(?<Name>...)は名前付きキャプチャグループです。キャプチャした文字列を独自の名前で呼び出すことができます。呼び出すときは、\\k<Name>を使用します。主に、キャプチャしたいが正規表現中に多くの括弧が存在する場合に、名前付きキャプチャグループを使用します。', 
    example: false
  },
  {
    id: 5, 
    name: '\\k<Name>', 
    data: '\\k<Name>は、名前付きキャプチャした文字列を呼び出す時に使用します。', 
    example: 'ターゲット文字列がThis is "Regex Hunting"の場合'
  },
];

export const alternationsRows = [
  {
    id: 1,
    name: '|',
    data: '|は、選択と呼ばれます。またはという意味を持つ特殊文字です。選択を使うことで、複数の正規表現のどれかにマッチするような1つの正規表現を作ることができます。選択を使う上で注意すべきことは、選択の優先順位は非常に低いということです。例えば、This is React|JavaScriptという正規表現は、This is ReactまたはThis is JavaScriptにマッチする正規表現ではありません。React|JavaScriptで1つの塊に見えますが、選択の優先順位が非常に低いので、この正規表現はThis is ReactまたはJavaScriptにマッチする正規表現を表します。もし選択の範囲を限定したい場合、キャプチャグループを使用します。',
    example: 'ターゲット文字列がThis is React This is JavaScriptの場合' 
  }
];

export const lookAroundsRows = [
  {
    id: 1,
    name: '(?=...)',
    data: '(?=...)は、肯定の先読みと呼ばれます。通常、正規表現をターゲット文字列に適用させる場合、ターゲット文字列の先頭から1文字1文字順番にマッチするかどうかを試行します。肯定の先読みは、まだ試行していない右の方の文字列に対して、...がマッチするかどうかを調べます。マッチする場合、肯定の先読みが成功し、...がマッチするかどうかの試行を開始した位置にマッチします。つまり、肯定の先読みは、...にマッチする文字列の位置を見つけます。重要なことは、全体の正規表現の最終的なマッチ結果に、肯定の先読みでマッチさせた文字列は含まれないということです。理由は、肯定の先読みのマッチ結果は位置を表すからです。肯定の先読みを使うことで、条件を絞ってマッチさせることができます。例えば、以下のコードのように、金額の数字のみにマッチさせることも可能になります。',
    example: 'ターゲット文字列がThis water(100ml) is 100yenの場合'
  },
  {
    id: 2,
    name: '(?!...)',
    data: '(?!...)は、否定の先読みと呼ばれます。肯定の先読みの=を!に変えると、否定の先読みになります。否定の先読みは、まだ試行していない右の方の文字列に対して、...がマッチしないかどうかを調べます。マッチしない場合、否定の先読みが成功し、...がマッチしないかどうかの試行を開始した位置にマッチします。つまり、否定の先読みは、...にマッチしない文字列の位置を見つけます。否定の先読みは、ある文字列を含まないようなマッチをさせたい時に使用します。',
    example: 'ターゲット文字列がThis water(500ml) is 100yenの場合'
  },
  {
    id: 3,
    name: '(?<=...)',
    data: '(?<=...)は、肯定の後読みと呼ばれます。肯定の先読みの=の手前に<を追加すると、肯定の後読みになります。肯定の後読みは、既にマッチを試行した左の方の文字列に対して、...がマッチするかどうかを調べます。マッチする場合、肯定の後読みが成功し、...がマッチするかどうかの試行を開始した位置にマッチします。つまり、肯定の後読みは、...にマッチする文字列の位置を見つけます。重要なことは、全体の正規表現の最終的なマッチ結果に、肯定の後読みでマッチさせた文字列は含まれないということです。理由は、肯定の後読みのマッチ結果は位置を表すからです。肯定の後読みを使うことで、条件を絞ってマッチさせることができます。',
    example: 'ターゲット文字列がhttps://www.regex-hunting.com/gamesの場合'
  },
  {
    id: 4,
    name: '(?<!...)',
    data: '(?<!...)は、否定の後読みと呼ばれます。肯定の後読みの=を!に変えると、否定の後読みになります。否定の後読みは、既にマッチを試行した左の方の文字列に対して、...がマッチしないかどうかを調べます。マッチしない場合、否定の後読みが成功し、...がマッチしないかどうかの試行を開始した位置にマッチします。つまり、否定の後読みは、...にマッチしない文字列の位置を見つけます。否定の後読みを使うことで、ある文字を末尾に含まないという条件を簡単に作れます。',
    example: 'ターゲット文字列がReact17.0 React16.0 React15.6の場合'
  }
];
