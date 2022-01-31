// 今月の月のみ取得するための関数
export const getMonthOfTheMonth = () => {
  const this_month = new Date().getMonth() + 1;
  return this_month;
};
