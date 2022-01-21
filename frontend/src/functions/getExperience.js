// 各ゲームの獲得経験値を取得するための関数
export const getExperience = (difficulty) => {
  let experience;
  switch (difficulty){
    case 'elementary':
      experience = 200;
      break;
    case 'intermediate':
      experience = 400;
      break;
    case 'advanced':
      experience = 600;
      break;
    default:
      console.log('エラーが起きました');
  }
  return experience;
};
