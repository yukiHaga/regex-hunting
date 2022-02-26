import { LeftSlideOutAnime } from '../components/shared_style.js';
import { LeftSlideInAnime } from '../components/shared_style.js';
import { RightSlideOutAnime } from '../components/shared_style.js';
import { RightSlideInAnime } from '../components/shared_style.js';

// スライドアニメーションの関数
export const slideFunction = (
  slide_in,
  slide_out,
  direction
) => {
  switch (true){
    case slide_out && !slide_in && direction === "left":
      return LeftSlideOutAnime;
    case !slide_out && slide_in && direction === "left":
      return LeftSlideInAnime;
    case slide_out && !slide_in && direction === "right":
      return RightSlideOutAnime;
    case !slide_out && slide_in && direction === "right":
      return RightSlideInAnime;
    default:
      return false;
  }
};
