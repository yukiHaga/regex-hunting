type GetMonsterName = (difficulty: string | undefined) => string | undefined;

// モンスター名を取得するための関数
// QuestionBlock.jsx, Games.jsx, RestartButton.jsxでgetMonsterNameを使用する
export const getMonsterName: GetMonsterName = (difficulty) => {
  let monsterName: string | undefined;
  switch (difficulty){
    case 'elementary':
      monsterName = 'スクータムの群れ';
      break;
    case 'intermediate':
      monsterName = 'カスアリウス';
      break;
    case 'advanced':
      monsterName = 'オルファ・ラパクス';
      break;
    default:
      console.log('エラーが起きました');
  }
  return monsterName;
};
