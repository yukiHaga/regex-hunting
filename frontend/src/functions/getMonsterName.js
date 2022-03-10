// モンスター名を取得するための関数
// QuestionBlock.jsx, Games.jsx, RestartButton.jsxでgetMonsterNameを使う
export const getMonsterName = (difficulty) => {
  let monsterName;
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
