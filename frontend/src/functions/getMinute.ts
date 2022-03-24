type GetMinute = (time: number) => number;

// ミリ秒のトータルタイムを分に変換して、hh:mm:ssのフォーマットで出力する関数
// timeにはミリ秒が入っている
// time / 1000でミリ秒が秒になる。さらに60で割ると、分になる
// 分の少数を、Math.floorで切り捨てした
// 総プレイ時間が59秒の場合、Math.floor(time/1000/60)は0になる
// もし0なら、少数第2位を切り捨てる
export const getMinute: GetMinute = (
  time
) => {

  const formatMin = Math.floor(time/1000/60) !== 0 ? Math.floor(time/1000/60) : Math.floor((time/1000/60)*10)/10;

  return formatMin;
};
