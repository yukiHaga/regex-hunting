import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Responsive
import { WIDTH } from '../style_constants.js';

// Colors
import { COLORS } from '../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../components/shared_style.js';

// リンク
import { BaseLink } from '../components/shared_style.js';

// Image
import ClawFlashImage from '../images/moment_claw_image.png'; 
import ErrorBackGroundImage from '../images/error_background.png';
import ErrorCodeImage from '../images/error_code.svg';

// 初登場のアニメーション
const FadeInAnime = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

// フェードアウトのアニメーション
const FadeOutAnime = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const FadeFunction = (
  displayState
) => {
  switch (true){
    case displayState === "in":
      return FadeInAnime;
    case displayState === "out":
      return FadeOutAnime;
    default:
      return false;
  }
};

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

const CustomImage = styled.img`
  width: 100%;
  height: 80%;
  object-fit: contain;
  z-index: 2;
  animation-name: ${({ displayState }) => FadeFunction(displayState) };
  animation-duration: 2s;
  animation-fill-mode: forwards;
`;

//メインのアウターのラッパー
const MainOuterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #171717;
`;

// メインのラッパー
const MainWrapper = styled.div`
  background-image: url(${ErrorBackGroundImage});
  background-size: cover;
  text-align: center;
  @media (max-width: ${WIDTH.MOBILE}) {
    padding-top: 10%;
  }
  width: 100%;
  height: 100%;
  animation-name: ${FadeInAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

// エラーコードのラッパー
const ErrorCodeImageWrapper = styled.img`
  margin: 0 auto;
  width: 10%;
  height: auto;
  object-fit: contain;
  margin-top: 8%;
  max-width: 100%;
  height: auto;
  @media (max-width: ${WIDTH.MOBILE}) {
    margin-top: 30%;
    width: 90%;
  }
`;

const CustomSentence = styled(DescriptionWrapper)`
  color: ${COLORS.WHITE}; 
`;

const CustomLink = styled(BaseLink)`
  color: ${COLORS.WHITE}; 
  text-decoration: underline;
`;

export const NotFoundPage = () => {

  const [ displayState, setDisplayState ] = useState("in");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayState("out");
    }, 3000);
    return () => clearTimeout(timer);
  },[
  ]);

  return (
    <MainOuterWrapper>
      <Mask>
        <CustomImage src={ClawFlashImage} displayState={displayState} />
      </Mask>
      <MainWrapper>
        <ErrorCodeImageWrapper src={ErrorCodeImage} />
        <CustomSentence>Sorry, the page you're looking con not found.</CustomSentence>
        <CustomSentence><CustomLink to="/">Back to Top</CustomLink></CustomSentence>
      </MainWrapper>
    </MainOuterWrapper>
  );
};
