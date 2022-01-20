import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BaseLink } from '../shared_style';

// Colors
import { COLORS } from '../../style_constants.js';

const GameStartButtonWrapper = styled(BaseLink)`
  border-style: none;
  border-radius: 3px;
  transition: 0.3s;
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
  background-image: -webkit-linear-gradient(rgba(255,255,255,.3) 0%,transparent 30%,transparent 30%,rgba(0,0,0,.1) 100%);
  background-image:         linear-gradient(rgba(255,255,255,.3) 0%,transparent 30%,transparent 30%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.1) inset,0 2px 10px 0 rgba(255,255,255,.2) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
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
