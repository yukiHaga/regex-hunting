import React, { Fragment, useMemo } from 'react'; 
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
  width: 290px;
`;

const GameStartButtonTextWrapper = styled.div`
  border-radius: 3px;
  color: white;
  background-color: ${COLORS.BLUE};
  text-align: center;
  font-size: 1.0em;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  padding: 3%;
  @media (max-width: 390px) {
    font-size: 0.9em;
  }
`;

export const GameStartButton = ({difficulty}) => {

  // デバイス幅が640px以下の場合にスマホと判定するようにしている
  // デバイス幅が640px以下なら、window.matchMedia('(max-device-width: 640px)').matchesがtrueになる
  const url = useMemo(() => {
    if (window.matchMedia('(max-device-width: 640px)').matches) {
      return '/?user=mobile'; 
    } else {
      return `/games/${difficulty}/start`; 
    }
  }, [
    difficulty
  ]);

  return (
    <>
      <GameStartButtonWrapper to={url}>
        <GameStartButtonTextWrapper>
          スタート
        </GameStartButtonTextWrapper>
      </GameStartButtonWrapper>
    </>
  );
};
