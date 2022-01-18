// 今月の日付をキー, 正答率をバリューとするオブジェクトを作る関数
// 正答率のグラフで使う
export const makeCorrectPercentGraphData = (
  correct_percents,
) => {

  const correct_percents_obj = {};
  const month_obj = {};

  // 今月の月初
  const first_day = new Date(
    new Date(
      new Date().getFullYear(), 
      new Date().getMonth(), 
      1
    )
  );

  // 今月の月末
  const end_day = new Date(
    new Date(
      new Date().getFullYear(), 
      new Date().getMonth() + 1, 
      0
    )
  );

  // getTimezoneOffsetは、first_dayをUTCタイムゾーンで評価した場合と、
  // first_dayをローカルタイムゾーンで評価した場合の
  // 差を分を単位として返す
  // 日本にいる場合、UTCからローカルを引くのでマイナスになる
  // GMT(昔の世界標準時間)とUTC(今の世界標準時間)は、
  // どちらも日本時間より9時間遅れてる
  // どちらも日本時間と9時間の差がある
  // 9時間遅れているので、分に直すと9 * 60 で540
  // -540がoffsetに代入される
  const offset = first_day.getTimezoneOffset();

  // toISOStringはレシーバの時間を、UTCタイムゾーンに変換して、
  // 一定のフォーマットで返す
  // UTCは日本より9時間遅れているので、遅れている分を事前に日本時間に足しておいて
  // その時間に対してtoISOStringで変換すれば、日本の時刻が得られる
  // 後でtoISOStringを使う為、
  // UTCと日本時間を足した時間を作成しておく(offsetが負なので、+になる)
  // その足した後の時間に対してtoISOStringを使うと、その時間に対して、
  // メソッドが実行されるので、日本時間になる
  // getTimeはレシーバの時間を、1970年からの経過ミリ秒に変換する
  // offsetをミリ秒に変換する
  // new Dateに1970-01-01 00:00:00(UTC)からの経過時刻(ミリ秒)を指定できる
  // ちゃんとした日付に変換されて出力される
  const add_first_day = new Date(first_day.getTime() - (offset * 60 * 1000));

  const add_end_day = new Date(end_day.getTime() - (offset * 60 * 1000));

  // correct_percents(配列)をオブジェクトに変換する処理
  // correct_percentsは、
  // play_dateのvalueをキー, correct_percentのvalueをvalueとするオブジェクト
  for( const obj of correct_percents) {
    const formatDate = obj["play_date"].slice(5, 10).replace('-', '/');
    correct_percents_obj[formatDate] = obj["correct_percent"];
  }

  // 今月の全ての月日をキー, バリューがnullのオブジェクトを生成する処理
  // キーがcorrect_percents_objに存在するなら、nullの代わりに
  // correct_percents_objのバリューを代入する
  for(const day = add_first_day; day <= add_end_day; day.setDate(day.getDate() + 1)) {
    const formatDate = day.toISOString().slice(5, 10).replace('-', '/');
    if(formatDate in correct_percents_obj) {
      month_obj[formatDate] = correct_percents_obj[formatDate];
    } else {
      month_obj[formatDate] = null;
    }
  }

  return month_obj;
};
