import React, { Fragment } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import { ColoredTwitterIcon } from '../Icons/CustomIcon';

// モンスター名を取得する関数
import { getMonsterName } from '../../functions/getMonsterName';

const ResultShareButtonWrapper = styled.a`
  width: 90%;
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
  margin: 2%;
`;

const ResultShareButtonTextWrapper = styled.div`
  border-radius: 3px;
  font-style: normal;
  font-size: 1em;
  color: ${COLORS.LIGHT_BLUE};
  text-align: center;
  background-color: ${COLORS.WHITE};
  border: 2px solid ${COLORS.LIGHT_BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6.9%;
  padding-bottom: 6.9%;
`;

type ResultShareButtonArg = {
  difficulty: string | undefined;
  gameResult: string;
  rankUp: boolean;
  rank?: number;
  clearTime?: string;
};

type GetTextFn = (
  difficulty: ResultShareButtonArg['difficulty'],
  gameResult: ResultShareButtonArg['gameResult'],
  rankUp: boolean
) =>  string | undefined;

export const ResultShareButton = ({
  difficulty,
  gameResult,
  rankUp,
  rank,
  clearTime
}: ResultShareButtonArg): JSX.Element => {

  // Twitterカードのセンテンスを取得する関数
  const getText: GetTextFn = (difficulty, gameResult, rankUp) => {
    if(gameResult === 'win' && !rankUp) {
      return `${getMonsterName(difficulty)}の討伐に成功しました！ クリアタイムは${clearTime}です。`
    } else if (gameResult === 'lose' && !rankUp) {
      return `${getMonsterName(difficulty)}の討伐に失敗しました...`
    } else if (gameResult === 'win' && rankUp) {
      return `ランクアップしました！現在のランクは${rank}です。`
    }
  };

  // 取得したセンテンスを変数textに代入
  const text = getText(difficulty, gameResult, rankUp);

  return (
    <>
    <ResultShareButtonWrapper
      href={`https://twitter.com/share?text=${text}&hashtags=RegexHunting,正規表現,ゲーム&url=https://www.regex-hunting.com/`}
      target="_blank"
      rel="noopener noreferrer"
    >
        <ResultShareButtonTextWrapper>
          <ColoredTwitterIcon fontSize="medium" />
          シェアする
        </ResultShareButtonTextWrapper>
      </ResultShareButtonWrapper>
    </>
  );
};
