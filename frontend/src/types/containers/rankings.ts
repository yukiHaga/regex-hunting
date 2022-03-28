type TopTenArray = {
  min_result_time: number;
  user: {
    active_title: string;
    image: string;
    name: string;
    rank: number;
  };
}[];

type difficultyTitle = "初級編" | "中級編" | "上級編";

export type RankingState = {
  topTenElementary: TopTenArray;
  topTenIntermediate: TopTenArray;
  topTenAdvanced: TopTenArray;
  currentTopTenArray: TopTenArray;
  difficultyTitle: difficultyTitle;
  prevDifficultyTitle: difficultyTitle;
  nextDifficultyTitle: difficultyTitle;
  slideIn: boolean;
  slideOut: boolean;
  direction: "" | "right" | "left";
};

export type SetRankingState = React.Dispatch<React.SetStateAction<RankingState>>;