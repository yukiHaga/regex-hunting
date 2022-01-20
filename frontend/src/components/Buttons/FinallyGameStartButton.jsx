import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const FinallyGameStartButtonWrapper = styled.div`
  margin-top: 30px;
  border-style: none;
  border-radius: 3px;
  transition: 0.3s;
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    opacity: 0.7;
  }
  cursor: pointer;
  text-decoration: none;
`;

const FinallyGameStartButtonTextWrapper = styled.div`
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
  background-color: ${COLORS.BLUE};
  padding-top: 5px;
  padding-bottom: 5px;
  background-image: -webkit-linear-gradient(rgba(255,255,255,.3) 0%,transparent 30%,transparent 30%,rgba(0,0,0,.1) 100%);
  background-image:         linear-gradient(rgba(255,255,255,.3) 0%,transparent 30%,transparent 30%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.1) inset,0 2px 10px 0 rgba(255,255,255,.2) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
`;

export const FinallyGameStartButton = ({ 
  setGameState,
}) => {

  // スタートを制御する関数
  const handleFinallyStart = (
    setGameState
  ) => {
    setGameState((prev) => ({
      ...prev,
      game_description_open: false
    })); 
  };

  return (
    <>
    <FinallyGameStartButtonWrapper 
      onClick={() => handleFinallyStart(setGameState)}
    >
        <FinallyGameStartButtonTextWrapper>
          ゲームを始める
        </FinallyGameStartButtonTextWrapper>
      </FinallyGameStartButtonWrapper>
    </>
  );
};
