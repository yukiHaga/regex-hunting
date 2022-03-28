// Colors
import { COLORS } from '../style_constants';

type HandleTitleColorType = (flashTitle: 'Good' | 'Bad') => string;

// タイトルカラーを取り扱う関数
// 答えを表示するダイアログでhandleTitleColorTypeを使用する
export const handleTitleColorType: HandleTitleColorType = (flashTitle) => {
  switch (flashTitle) {
    case "Good":
      return COLORS.MAIN;
    case "Bad":
      return COLORS.RED;
    default:
      return COLORS.RED;
  }
};
