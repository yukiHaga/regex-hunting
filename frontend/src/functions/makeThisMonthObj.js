// 今月の日付をキー, 0(count)をバリューとするオブジェクトを作る関数
// ヒートマップで使う
export const makeThisMonthObj = (
  first_day,
  end_day
) => {

  const month_obj = {};

  for(const day = first_day; day <= end_day; day.setDate(day.getDate() + 1)) {
    const formatDate = day.toISOString().slice(0, 10);
    
    month_obj[formatDate] = 0;
  }

  return month_obj;
};
