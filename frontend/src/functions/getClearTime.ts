type GetClearTime = (gameStartTime: number, gameEndTime: number) => string;

// タイムを計算してhh:mm:ssのフォーマットで出力する関数
// マイページで使う場合、第1引数を0にする
// hhは無くても良い為、やっぱり消す
// hh:mm:ssがmm:ss表記になる
// const hours=Math.floor(milli_sec/1000/60/60)%24;
// const hh = ('0' + hours).slice(-2);
export const getClearTime: GetClearTime = (
  gameStartTime,
  gameEndTime
) => {
  const milli_sec = gameEndTime - gameStartTime;
  const sec = Math.floor(milli_sec/1000) % 60;
  const min = Math.floor(milli_sec/1000/60) % 60;

  const mm = ('0' + min).slice(-2);
  const ss = ('0' + sec).slice(-2);
  return `${mm}:${ss}`;
};