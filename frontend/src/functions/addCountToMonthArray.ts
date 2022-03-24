// 呼び出しシグネチャを使用して、関数addCountToMonthArrayの型を定義
// 型エイリアスを使用して、AddCountToMonthArrayという別名をつけた
type AddCountToMonthArray = {
  (
    gameFrequenciesPerDay: {[key: string]: number},
    monthObj: {[key: string]: number}
  ): {count: number, date: string}[];
};

// 今月のゲームクリア日にだけ、propsのcountを追加する関数
// ヒートマップで使う
export const addCountToMonthArray: AddCountToMonthArray = (
  gameFrequenciesPerDay,
  monthObj
) => {
  const monthObjArray = Object.entries(monthObj).map(([date, count]) => {
    return {
      date: date,
      count: gameFrequenciesPerDay[date] ?
      gameFrequenciesPerDay[date] : count
    };
  });
  return monthObjArray;
};