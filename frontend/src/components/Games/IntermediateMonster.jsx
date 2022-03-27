import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import IntermediateMonsterImage from '../../images/intermediate.png';

// handleColorType
import { handleColorType } from '../../functions/handleColorType';

// アニメーション
import {
  MonsterFlash,
  FadeInAnime,
  FadeOutAnime
} from '../shared_style';

const IntermediateWrapper = styled.div`
  animation-name: ${({ gameResult }) => gameResult === "win" && FadeOutAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  text-align: center;
`;

// 初登場時のモンスター
const FirstIntermediateMonsterWrapper = styled.img`
  width: 26%;
  height: 26%;
  object-fit: contain;
  animation-name: ${FadeInAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const IntermediateMonsterWrapper = styled.img`
  width: 26%;
  height: 26%;
  object-fit: contain;
  animation-name: ${({ questionJudgement }) => questionJudgement === "correct" && MonsterFlash};
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
`;

const HpGageWrapper = styled.div`
  width: 40%;
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLACK};
  animation-name: ${({ firstAppearance }) => firstAppearance && FadeInAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  border: 1px solid #000;
  box-shadow: inset 1px 1px 3px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 0 rgba(255, 255, 255, 0.12);
  margin: 0 auto;
`;

const InnerHpGageWrapper = styled.div`
  width: ${({ monsterHp, monsterMaxHp }) => `${100 * (monsterHp / monsterMaxHp)}%`};
  transition: 0.5s;
  height: 1.8vh;
  border-radius: 3px;
  background-color: ${({ monsterHp }) => handleColorType(monsterHp)};
  background-image: -webkit-linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  background-image: linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.2) inset,0 2px 10px 0 rgba(255,255,255,.5) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
`;

export const IntermediateMonster = ({
  monsterHp,
  monsterMaxHp,
  questionJudgement,
  firstAppearance,
  gameResult,
  gameDescriptionOpen
}) => {
  return (
    <>
      {
        !gameDescriptionOpen &&
          <IntermediateWrapper
            gameResult={gameResult}
          >
            {
              firstAppearance ?
                <FirstIntermediateMonsterWrapper
                  src={IntermediateMonsterImage}
                />
              :
                <IntermediateMonsterWrapper
                  src={IntermediateMonsterImage}
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
          </IntermediateWrapper>

      }
    </>
  );
};
