export type MyPageState = {
  gameFrequenciesPerDay: {
    [key: string]: number;
  };
  fastTimePerDifficulty: {
    [key in 'elementary' | 'intermediate' | 'advanced']?: number;
  };
  ownedTitles: {
    name: string
    release_condition: string
    release_date: string
  }[];
  selectedTotalTime: number;
  selectedGameClearCount: number;
  selectedFastTime: number;
  difficultyMonthTitle: string;
  prevDifficultyMonthTitle: string;
  nextDifficultyMonthTitle: string;
  isOpenDialog: boolean;
  name: string;
  releaseDate: string;
  releaseCondition: string;
  display: boolean;
  message: string;
  getPageInfo: boolean;
  totalTimePerDifficulty: {
    advanced: number;
    elementary: number;
    intermediate: number;
  };
  gameClearCountPerDifficulty: {
    advanced: number;
    elementary: number;
    intermediate: number;
  };
};

export type SetMyPageState = React.Dispatch<React.SetStateAction<MyPageState>>;