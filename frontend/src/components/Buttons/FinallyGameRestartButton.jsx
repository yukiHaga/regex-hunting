import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const FinallyGameRestartButtonWrapper = styled.div`
  margin-top: 30px;
  border-style: none;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: 0.3s;
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    opacity: 0.7;
  }
  cursor: pointer;
  text-decoration: none;
`;

const FinallyGameRestartButtonTextWrapper = styled.div`
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

export const FinallyGameRestartButton = ({ 
  setGameState,
}) => {

  // スタートを制御する関数
  const handleFinallyRestart = (
    setGameState
  ) => {
    setGameState((prev) => ({
      ...prev,
      game_description_open: false,
      click_description_open: false
    })); 
  };

  return (
    <>
    <FinallyGameRestartButtonWrapper 
      onClick={() => handleFinallyRestart(setGameState)}
    >
        <FinallyGameRestartButtonTextWrapper>
          ゲームを再開する
        </FinallyGameRestartButtonTextWrapper>
      </FinallyGameRestartButtonWrapper>
    </>
  );
};