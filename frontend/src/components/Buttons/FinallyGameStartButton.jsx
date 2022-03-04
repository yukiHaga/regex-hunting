import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const FinallyGameStartButtonWrapper = styled.div`
  margin-top: 2%;
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
  width: 25%;
`;

const FinallyGameStartButtonTextWrapper = styled.div`
  border-radius: 3px;
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.WHITE};
  text-align: center;
  background-color: ${COLORS.BLUE};
  padding: 5%;
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
      gameDescriptionOpen: false,
      gameStartTime: performance.now(),
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
