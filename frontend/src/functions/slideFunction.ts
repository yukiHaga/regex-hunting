import { LeftSlideOutAnime } from '../components/shared_style.js';
import { LeftSlideInAnime } from '../components/shared_style.js';
import { RightSlideOutAnime } from '../components/shared_style.js';
import { RightSlideInAnime } from '../components/shared_style.js';
import { Keyframes } from 'styled-components';

type SlideFunction = (slideIn: boolean, slideOut: boolean, direction: 'left' | 'right') => false | Keyframes;

// スライドアニメーションの関数
export const slideFunction: SlideFunction = (
  slideIn,
  slideOut,
  direction
) => {
  switch (true){
    case slideOut && !slideIn && direction === "left":
      return LeftSlideOutAnime;
    case !slideOut && slideIn && direction === "left":
      return LeftSlideInAnime;
    case slideOut && !slideIn && direction === "right":
      return RightSlideOutAnime;
    case !slideOut && slideIn && direction === "right":
      return RightSlideInAnime;
    default:
      return false;
  }
};
