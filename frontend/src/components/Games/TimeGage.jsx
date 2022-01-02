import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const TimeGageWrapper = styled.div`
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 3px 3px 0 0;
  width: 100%;
  height: 36px;
  display: flex;
  box-sizing: border-box;
  border: 5px solid;
  border-color: ${COLORS.GAGE_GRAY};
`;

const TypeWrapper = styled.div`
  height: 26px;
  width: 120px;
  font-size: 18px;
  line-height: 26px;
  background-color: ${COLORS.GAGE_GRAY};
  color: ${COLORS.BROWN};
  font-family: YuGothic;
  font-weight: bold;
  text-align: center;
`;

// ゲージ減少のアニメーション
const TimeGageAnime = keyframes`
  from {
    width: 100%;
  }

  to {
    width: 0;
  }
`;

const GageWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${COLORS.YELLOW};
  box-sizing: border-box;
  border: none;
  outline: none;
  animation: ${TimeGageAnime} 30s linear 1;
`;

const GageOuterWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const TimeGage = () => {
  return (
    <>
      <TimeGageWrapper>
        <TypeWrapper>
          TIME
        </TypeWrapper>
        <GageOuterWrapper>
          <GageWrapper />
        </GageOuterWrapper>
      </TimeGageWrapper>
    </>
  );
};
