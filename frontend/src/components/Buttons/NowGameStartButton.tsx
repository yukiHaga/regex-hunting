import React, { Fragment } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants';

// gameStateの型
import { SetGameState } from '../../types/containers/games'

const NowGameStartButtonWrapper = styled.div`
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
  background-color: ${COLORS.BLUE};
  margin-left: 2%;
`;

const NowGameStartButtonTextWrapper = styled.div`
  border-radius: 3px;
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.WHITE};
  text-align: center;
  padding: 5%;
`;

type NowGameStartButtonArg = {
  setGameState: SetGameState;
};

export const NowGameStartButton = ({
  setGameState,
}: NowGameStartButtonArg): JSX.Element => {

  // スタートを制御する関数
  // このボタンを押したと同時にタイムを測る
  const handleFinallyStart = (
    setGameState: SetGameState
  ): void => {
    setGameState((prev) => ({
      ...prev,
      gameDescriptionOpen: false,
      gameStartTime: performance.now(),
    }));
  };

  return (
    <>
    <NowGameStartButtonWrapper
      onClick={() => handleFinallyStart(setGameState)}
    >
        <NowGameStartButtonTextWrapper>
          スライドを見ずに始める
        </NowGameStartButtonTextWrapper>
      </NowGameStartButtonWrapper>
    </>
  );
};
