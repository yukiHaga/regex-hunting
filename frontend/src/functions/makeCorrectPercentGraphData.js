// 今月の日付をキー, 正答率をバリューとするオブジェクトを作る関数
// 正答率のグラフで使う
export const makeCorrectPercentGraphData = (
  correct_percents,
  first_day,
  end_day
) => {
  const correct_percents_obj = {};
  const month_obj = {};

  // correct_percentsをオブジェクトに変換する処理
  // correct_percentsは、
  // play_dateのvalueをキー, correct_percentのvalueをvalueとするオブジェクト
  for( const obj of correct_percents) {
    const formatDate = obj["play_date"].slice(5, 10).replace('-', '/');
    correct_percents_obj[formatDate] = obj["correct_percent"];
  }

  // 今月の全ての月日をキー, バリューがnullのオブジェクトを生成する処理
  // キーがcorrect_percents_objに存在するなら、nullの代わりに
  // correct_percents_objのバリューを代入する
  for(const day = first_day; day <= end_day; day.setDate(day.getDate() + 1)) {
    const formatDate = day.toISOString().slice(5, 10).replace('-', '/');
    if(formatDate in correct_percents_obj) {
      month_obj[formatDate] = correct_percents_obj[formatDate];
    } else {
      month_obj[formatDate] = null;
    }
  }

  return month_obj;
};
