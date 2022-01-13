import React from 'react';
import styled, { keyframes } from 'styled-components';

// Image
import ClawFlashImage from '../../images/moment_claw_image.png'; 

const Mask = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 攻撃されたときのアニメーション
const FadeInAnime = keyframes`
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`;

const CustomImage = styled.img`
  width: 100%;
  height: 80%;
  object-fit: contain;
  z-index: 2;
  animation-name: ${FadeInAnime};
  animation-duration: 1s;
  animation-fill-mode: forwards;
`;

export const ClawImage = () => {
  return (
    <>
      <Mask>
        <CustomImage src={ClawFlashImage} />
      </Mask>
    </>
  );
};
