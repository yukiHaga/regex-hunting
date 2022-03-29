type MakeThisMonthObj = {
  (firstDay: Date, endDay: Date): {[key: string]: number};
};

// 今月の日付をキー, 0(count)をバリューとするオブジェクトを作る関数
// ヒートマップで使う
export const makeThisMonthObj: MakeThisMonthObj = (
  firstDay,
  endDay
) => {
  let monthObj: {[key: string]: number} = {};

  // UTC(世界の標準時間)と日本時間の差分を分で取得する
  // 日本時間はUTCより9時間進んでいる為、-540が戻り値になる
  const offset = firstDay.getTimezoneOffset();

  const addFirstDay = new Date(firstDay.getTime() - (offset * 60 * 1000));

  const addEndDay = new Date(endDay.getTime() - (offset * 60 * 1000));

  for(const day = addFirstDay; day <= addEndDay; day.setDate(day.getDate() + 1)) {
    const formatDate = day.toISOString().slice(0, 10);

    monthObj[formatDate] = 0;
  }

  return monthObj;
};
