// 今月の最大の正答率を導出する関数
export const getMostCorrectPercent = (
  correct_percents
) => {
  let most_correct_percent = 0;
  correct_percents.forEach((obj) => {
    if(most_correct_percent !== 0 && most_correct_percent < obj["correct_percent"]) {
      most_correct_percent = obj["correct_percent"];    
    } else if(most_correct_percent === 0) {
      most_correct_percent = obj["correct_percent"];
    }
  });
  return most_correct_percent;
};
