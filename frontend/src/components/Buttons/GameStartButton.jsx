import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BaseLink } from '../shared_style';

// Colors
import { COLORS } from '../../style_constants.js';

const GameStartButtonWrapper = styled(BaseLink)`
  border-style: none;
  border-radius: 3px;
  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
  }
`;

const GameStartButtonTextWrapper = styled.div`
  width: 290px;
  height: 40px;
  border-radius: 3px;
  color: white;
  background-color: ${COLORS.BLUE};
  text-align: center;
  font-size: 16px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
`;

export const GameStartButton = ({difficulty}) => {
  return (
    <>
      <GameStartButtonWrapper to={`/games/${difficulty}/start`}>
        <GameStartButtonTextWrapper>
          スタート
        </GameStartButtonTextWrapper>
      </GameStartButtonWrapper>
    </>
  );
};
