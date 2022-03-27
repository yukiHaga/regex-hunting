type GetExperience = (difficulty: string | undefined) => number | undefined;

// 各ゲームの獲得経験値を取得するための関数
export const getExperience: GetExperience = (difficulty) => {
  let experience: number | undefined;
  switch (difficulty){
    case 'elementary':
      experience = 200;
      break;
    case 'intermediate':
      experience = 300;
      break;
    case 'advanced':
      experience = 400;
      break;
    default:
      console.log('エラーが起きました');
  }
  return experience;
};
