import React, { Fragment } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// gameStateの型
import { SetGameState } from '../../types/containers/games'

const FinallyGameRestartButtonWrapper = styled.div`
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

const FinallyGameRestartButtonTextWrapper = styled.div`
  border-radius: 3px;
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.WHITE};
  text-align: center;
  background-color: ${COLORS.BLUE};
  padding: 5%;
`;

type FinallyGameRestartButtonArg = {
  setGameState: SetGameState;
};

export const FinallyGameRestartButton = ({
  setGameState,
}: FinallyGameRestartButtonArg): JSX.Element => {

  // スタートを制御する関数
  const handleFinallyRestart = (
    setGameState: SetGameState
  ): void => {
    setGameState((prev) => ({
      ...prev,
      gameDescriptionOpen: false,
      clickDescriptionOpen: false
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
