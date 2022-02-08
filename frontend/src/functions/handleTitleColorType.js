// Colors
import { COLORS } from '../style_constants.js';

// タイトルカラーを取り扱う関数
// 答えを表示するダイアログでhandleTitleColorTypeを使用する
export const handleTitleColorType = (flash_title) => {
  switch (flash_title) {
    case "Good":
      return COLORS.MAIN;
    case "Bad":
      return COLORS.RED;
    default:
      return COLORS.RED;
  }
};
