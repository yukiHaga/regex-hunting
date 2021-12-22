import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const TimeGageWrapper = styled.div`
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 3px;
  width: 100%;
  height: 36px;
  display: flex;
  box-sizing: border-box;
  border: 8px solid;
  border-color: ${COLORS.GAGE_GRAY};
`;

const TypeWrapper = styled.div`
  height: 23px;
  width: 77px;
  font-size: 18px;
  line-height: 23px;
  background-color: ${COLORS.GAGE_GRAY};
  color: ${COLORS.BROWN};
  font-family: YuGothic;
  font-weight: bold;
  text-align: center;
`;

const GageWrapper = styled.div`
  height: 100%;
  width: 60%;
  background-color: ${COLORS.YELLOW};
  box-sizing: border-box;
  border: none;
  outline: none;
`;

export const TimeGage = () => {
  return (
    <>
      <TimeGageWrapper>
        <TypeWrapper>
          TIME
        </TypeWrapper>
        <GageWrapper>
        </GageWrapper>
      </TimeGageWrapper>
    </>
  );
};
