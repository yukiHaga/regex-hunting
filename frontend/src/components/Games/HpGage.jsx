import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const HpGageWrapper = styled.div`
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 0 0 3px 3px;
  width: 100%;
  height: 31px;
  display: flex;
  box-sizing: border-box;
  border-left: 5px solid;
  border-right: 5px solid;
  border-bottom: 5px solid;
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

const GageWrapper = styled.div`
  height: 100%;
  width: 80%;
  background-color: ${COLORS.LIGHT_BLUE};
  box-sizing: border-box;
  border: none;
  outline: none;
`;

export const HpGage = () => {
  return (
    <>
      <HpGageWrapper>
        <TypeWrapper>
          HP
        </TypeWrapper>
        <GageWrapper>
        </GageWrapper>
      </HpGageWrapper>
    </>
  );
};
