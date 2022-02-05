// Colors
import { COLORS } from '../style_constants.js';

// HPのカラーを取り扱う関数
export const handleColorType = (hp) => {
  switch (true) {
    case hp > 50:
      return COLORS.HP_BLUE;
    case hp <= 50 && hp > 20:
      return COLORS.YELLOW;
    case hp <= 20:
      return COLORS.RED;
    default:
      return COLORS.LIGHT_BLUE;
  }
};
