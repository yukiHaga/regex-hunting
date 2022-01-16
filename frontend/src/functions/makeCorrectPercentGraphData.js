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
  for(const day = first_day; day <= end_day; day.setDate(day.getDate() + 1)) {
    const formatDate = day.toISOString().slice(5, 10).replace('-', '/');
    month_obj[formatDate] = null;
  }

  // correct_percents_objの内容をmonth_objに反映させる処理
  // keyはmm/dd
  Object.keys(correct_percents_obj).forEach(key => {
    if(key in month_obj) {
       month_obj[key] = correct_percents_obj[key]; 
    }
  });
  
  return month_obj;
};
