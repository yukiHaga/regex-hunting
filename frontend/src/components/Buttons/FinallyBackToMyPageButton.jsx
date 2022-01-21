import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BaseLink } from '../shared_style';

// Colors
import { COLORS } from '../../style_constants.js';

const FinallyBackToMyPageButtonWrapper = styled(BaseLink)`
  margin-top: 30px;
  border-style: none;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: 0.3s;
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
  }
`;

const FinallyBackToMyPageButtonTextWrapper = styled.div`
  width: 240px;
  height: 40px;
  border-radius: 3px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 40px;
  color: ${COLORS.WHITE};
  text-align: center;
  background-color: ${COLORS.MAIN};
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const FinallyBackToMyPageButton = () => {
  return (
    <>
      <FinallyBackToMyPageButtonWrapper to={'/my-page'}>
        <FinallyBackToMyPageButtonTextWrapper>
          選択画面へ戻る
        </FinallyBackToMyPageButtonTextWrapper>
      </FinallyBackToMyPageButtonWrapper>
    </>
  );
};
