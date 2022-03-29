export const getJpDifficulty = (difficulty: string | undefined): string | undefined => {
  let jpDifficulty;
  switch (difficulty){
    case 'elementary':
      jpDifficulty = '初級';
      break;
    case 'intermediate':
      jpDifficulty = '中級';
      break;
    case 'advanced':
      jpDifficulty = '上級';
      break;
  }
  return jpDifficulty;
};