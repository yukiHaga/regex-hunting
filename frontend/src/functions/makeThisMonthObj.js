// 今月の日付をキー, 0(count)をバリューとするオブジェクトを作る関数
// ヒートマップで使う
export const makeThisMonthObj = (
  first_day,
  end_day
) => {

  const month_obj = {};

  // UTC(世界の標準時間)と日本時間の差分を分で取得する
  // 日本時間はUTCより9時間進んでいるので、-540が戻り値になる
  const offset = first_day.getTimezoneOffset();

  const add_first_day = new Date(first_day.getTime() - (offset * 60 * 1000));

  const add_end_day = new Date(end_day.getTime() - (offset * 60 * 1000));

  for(const day = add_first_day; day <= add_end_day; day.setDate(day.getDate() + 1)) {
    const formatDate = day.toISOString().slice(0, 10);
    
    month_obj[formatDate] = 0;
  }

  return month_obj;
};
