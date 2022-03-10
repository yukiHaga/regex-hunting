import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import AdvancedMonsterImage from '../../images/advanced.png'; 

// handleColorType 
import { handleColorType } from '../../functions/handleColorType.js';

// アニメーション
import { MonsterFlash } from '../shared_style.js';
import { FadeInAnime } from '../shared_style.js';
import { FadeOutAnime } from '../shared_style.js';

const AdvancedWrapper = styled.div`
  animation-name: ${({ gameResult }) => gameResult === "win" && FadeOutAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  text-align: center;
  position: relative;
`;

// 初登場時のモンスター
const FirstAdvancedMonsterWrapper = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-95%) translateX(-50%);
  -webkit- transform: translateY(-95%) translateX(-50%);
  margin: auto;
  width: 50vw;
  height: 55vh;
  z-index: 2;
  object-fit: contain;
  animation-name: ${FadeInAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const AdvancedMonsterWrapper = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-95%) translateX(-50%);
  -webkit- transform: translateY(-95%) translateX(-50%);
  margin: auto;
  width: 50vw;
  height: 55vh;
  z-index: 2;
  object-fit: contain;
  animation-name: ${({ questionJudgement }) => questionJudgement === "correct" && MonsterFlash};
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
`;

const HpGageWrapper = styled.div`
  width: 50vw;
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

export const AdvancedMonster = ({
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
          <AdvancedWrapper
            gameResult={gameResult}
          >
            {
              firstAppearance ?
                <FirstAdvancedMonsterWrapper 
                  src={AdvancedMonsterImage} 
                />
              :
                <AdvancedMonsterWrapper 
                  src={AdvancedMonsterImage} 
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
          </AdvancedWrapper>

      }
    </>
  );
};
