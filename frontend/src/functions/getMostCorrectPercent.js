// 今月の最大の正答率を導出する関数
// reduceの第1引数は、配列の1番目の要素(previousValue)
// reduceの第２引数は、配列の2番目の要素(currentValue)
// reduceに指定したcallbackの戻り値がpreviousValueになる
// Math.maxは、与えた数の中で一番大きな数を返す。
// 3項演算子はログインしているけど、ゲームクリアが一回もないユーザー
// に対応した処理
export const getMostCorrectPercent = (
  correct_percents
) => {
  const most_correct_percent = !correct_percents.length ? 
    0 
  : 
    correct_percents.map((obj) => {
      return obj["correct_percent"];
    }).reduce((previousValue, currentValue) => {
      return Math.max(previousValue, currentValue);    
    });
  return most_correct_percent;
};
