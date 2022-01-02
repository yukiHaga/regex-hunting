import React from 'react';
import styled, { keyframes } from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import ElementaryMonsterImage from '../../images/elementary.png'; 

// 攻撃されたときのアニメーション
const ElementaryMonsterFlash = keyframes`
  20%{
    opacity: 0;
  }
  40%{
    opacity: 1;
  }
  60%{
    opacity: 0;
  }
  80%{
    opacity: 1;
  }
`;

// 初登場のアニメーション
const FadeInAnime = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

// 倒されたときのアニメーション
const FadeOutAnime = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const ElementaryWrapper = styled.div`
  animation-name: ${(props) => props.game_result === "win" && FadeOutAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

// 初登場時のモンスター
const FirstElementaryMonsterWrapper = styled.img`
  width: 211px;
  height: 205px;
  object-fit: contain;
  animation-name: ${FadeInAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const ElementaryMonsterWrapper = styled.img`
  width: 211px;
  height: 205px;
  object-fit: contain;
  animation-name: ${(props) => props.question_finish && ElementaryMonsterFlash};
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
`;

const HpGageWrapper = styled.div`
  width: 160px;
  height: 15px;
  border: 1px solid ${COLORS.GAGE_GRAY};
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLACK};
  animation-name: ${(props) => props.first_appearance && FadeInAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

// HPのカラーを取り扱う関数
const handleColorType = (monster_hp) => {
  switch (true) {
    case monster_hp > 50:
      return COLORS.LIGHT_BLUE;
    case monster_hp <= 50 && monster_hp > 20:
      return COLORS.HP_YELLOW;
    case monster_hp <= 20:
      return COLORS.HP_RED;
    default:
      return COLORS.LIGHT_BLUE;
  }
};

const InnerHpGageWrapper = styled.div`
  width: ${(props) => `${160 * (props.monster_hp / props.monster_max_hp)}px`};
  transition: 0.5s;
  height: 15px;
  border-radius: 3px;
  background-color: ${(props) => handleColorType(props.monster_hp)};
`;

export const ElementaryMonster = ({
  monster_hp,
  monster_max_hp,
  question_finish,
  first_appearance,
  game_result
}) => {


  return (
    <>
      <ElementaryWrapper
        game_result={game_result}
      >
        {
          first_appearance ?
            <FirstElementaryMonsterWrapper 
              src={ElementaryMonsterImage} 
            />
          :
            <ElementaryMonsterWrapper 
              src={ElementaryMonsterImage} 
              question_finish={question_finish}
            />
        }
        <HpGageWrapper
          first_appearance={first_appearance}
        >
          <InnerHpGageWrapper 
            monster_hp={monster_hp} 
            monster_max_hp={monster_max_hp}
          />
        </HpGageWrapper>
      </ElementaryWrapper>
    </>
  );
};
