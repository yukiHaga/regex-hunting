import React, { Fragment, useMemo } from 'react';
import styled from 'styled-components';

import { BaseLink } from '../shared_style';

// Colors
import { COLORS } from '../../style_constants';

// Responsive
import { WIDTH } from '../../style_constants';

// ここのwidthはpx指定しないとレスポンシブの場合にレイアウトが崩れる
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
  font-style: normal;
  font-weight: 500;
  padding: 3%;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 0.9em;
  }
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 0.9em;
  }
`;

type GameStartButtonArg = {
  difficulty: 'elementary' | 'intermediate' | 'advanced';
  setMobileState?: React.Dispatch<React.SetStateAction<{display: boolean; message: string;}>>;
};

export const GameStartButton = ({
  difficulty,
  setMobileState
}: GameStartButtonArg): JSX.Element => {

  // デバイス幅が640px以下の場合にスマホと判定するようにしている
  // タブレットでもゲームして欲しくない為、1000pxにした
  // デバイス幅が640px以下なら、window.matchMedia('(max-device-width: 640px)').matchesがtrueになる
  const url = useMemo(() => {
    if (window.matchMedia(`(max-device-width: ${WIDTH.PC})`).matches) {
      return '/';
    } else {
      return `/games/${difficulty}/start`;
    }
  }, [
    difficulty
  ]);

  const handleMobileState = (): void => {
    if(setMobileState) {
      setMobileState((prev)=>({
        ...prev,
        display: true,
        message: "PCからご利用ください",
      }));
    }
  };

  return (
    <>
      <GameStartButtonWrapper to={url} onClick={handleMobileState}>
        <GameStartButtonTextWrapper>
          スタート
        </GameStartButtonTextWrapper>
      </GameStartButtonWrapper>
    </>
  );
};
