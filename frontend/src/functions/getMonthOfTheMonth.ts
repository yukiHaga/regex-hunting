// 今月の月のみ取得するための関数
export const getMonthOfTheMonth = (): number => {
  const thisMonth = new Date().getMonth() + 1;
  return thisMonth;
};