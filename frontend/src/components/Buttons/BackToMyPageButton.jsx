import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BaseLink } from '../shared_style';

// Colors
import { COLORS } from '../../style_constants.js';

const BackToMyPageButtonWrapper = styled(BaseLink)`
  border-style: none;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: 0.3s;
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
  }
  width: 90%;
  margin: 2%;
`;

const BackToMyPageButtonTextWrapper = styled.div`
  border-radius: 3px;
  font-style: normal;
  font-size: 1em;
  color: ${COLORS.WHITE};
  text-align: center;
  background-color: ${COLORS.MAIN};
  padding-top: 8%;
  padding-bottom: 8%;
`;

export const BackToMyPageButton = () => {
  return (
    <>
    <BackToMyPageButtonWrapper to={'/my-page'}>
        <BackToMyPageButtonTextWrapper>
          選択画面へ戻る
        </BackToMyPageButtonTextWrapper>
      </BackToMyPageButtonWrapper>
    </>
  );
};
