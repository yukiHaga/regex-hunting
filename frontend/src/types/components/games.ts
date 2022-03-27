// モンスターの型
export type MonsterArg = {
  monsterHp: number;
  monsterMaxHp: number;
  questionJudgement: "progress" | "correct" | "incorrect";
  firstAppearance: boolean;
  gameResult: "" | "win" | "lose" | "progress";
  gameDescriptionOpen: boolean;
};