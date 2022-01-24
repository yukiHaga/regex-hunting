import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const FinallyGameStartButtonWrapper = styled.div`
  margin-top: 30px;
  border-style: none;
  border-radius: 3px;
  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
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
`;

export const FinallyGameStartButton = ({ 
  setGameState,
}) => {

  // スタートを制御する関数
  // このボタンを押したと同時にタイムを測る
  const handleFinallyStart = (
    setGameState
  ) => {
    setGameState((prev) => ({
      ...prev,
      game_description_open: false,
      game_start_time: performance.now(),
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
