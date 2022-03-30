import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants';

// Image
import ElementaryMonsterImage from '../../images/elementary.png';

// handleColorType
import { handleColorType } from '../../functions/handleColorType';

// アニメーション
import {
  MonsterFlash,
  FadeInAnime,
  FadeOutAnime
} from '../shared_style';

import { MonsterArg } from '../../types/components/games';

const ElementaryWrapper = styled.div<{gameResult: "" | "progress" | "win" | "lose"}>`
  animation-name: ${({ gameResult }) => gameResult === "win" && FadeOutAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  text-align: center;
`;

// 初登場時のモンスター
const FirstElementaryMonsterWrapper = styled.img`
  width: 50%;
  height: 50%;
  object-fit: contain;
  animation-name: ${FadeInAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const ElementaryMonsterWrapper = styled.img<{questionJudgement: "progress" | "correct" | "incorrect"}>`
  width: 50%;
  height: 50%;
  object-fit: contain;
  animation-name: ${({ questionJudgement }) => questionJudgement === "correct" && MonsterFlash};
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
`;

const HpGageWrapper = styled.div<{firstAppearance: boolean}>`
  width: 50%;
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLACK};
  animation-name: ${({ firstAppearance }) => firstAppearance && FadeInAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  border: 1px solid #000;
  box-shadow: inset 1px 1px 3px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 0 rgba(255, 255, 255, 0.12);
  margin: 0 auto;
`;

// レイアウト崩れるから、heightは15pxにした
const InnerHpGageWrapper = styled.div<{monsterHp: number, monsterMaxHp: number}>`
  width: ${({ monsterHp, monsterMaxHp }) => `${100 * (monsterHp / monsterMaxHp)}%`};
  transition: 0.5s;
  height: 15px;
  border-radius: 3px;
  background-color: ${({ monsterHp }) => handleColorType(monsterHp)};
  background-image: -webkit-linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  background-image: linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.2) inset,0 2px 10px 0 rgba(255,255,255,.5) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
`;

export const ElementaryMonster = ({
  monsterHp,
  monsterMaxHp,
  questionJudgement,
  firstAppearance,
  gameResult,
  gameDescriptionOpen
}: MonsterArg): JSX.Element => {
  return (
    <>
      {
        !gameDescriptionOpen &&
          <ElementaryWrapper
            gameResult={gameResult}
          >
            {
              firstAppearance ?
                <FirstElementaryMonsterWrapper
                  src={ElementaryMonsterImage}
                />
              :
                <ElementaryMonsterWrapper
                  src={ElementaryMonsterImage}
                  questionJudgement={questionJudgement}
                />
            }
            <HpGageWrapper
              firstAppearance={firstAppearance}
            >
              <InnerHpGageWrapper
                monsterHp={monsterHp}
                monsterMaxHp={monsterMaxHp}
              />
            </HpGageWrapper>
          </ElementaryWrapper>

      }
    </>
  );
};
