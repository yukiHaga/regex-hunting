import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Image
import ElementaryMonsterImage from '../../images/elementary.png'; 

// handleColorType 
import { handleColorType } from '../../functions/handleColorType.js';

// アニメーション
import { MonsterFlash } from '../shared_style.js';
import { FadeInAnime } from '../shared_style.js';
import { FadeOutAnime } from '../shared_style.js';

const ElementaryWrapper = styled.div`
  animation-name: ${(props) => props.game_result === "win" && FadeOutAnime};
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

const ElementaryMonsterWrapper = styled.img`
  width: 50%;
  height: 50%
  object-fit: contain;
  animation-name: ${(props) => props.question_judgement === "correct" && MonsterFlash};
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
`;

const HpGageWrapper = styled.div`
  width: 50%;
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLACK};
  animation-name: ${(props) => props.first_appearance && FadeInAnime};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  border: 1px solid #000;
  box-shadow: inset 1px 1px 3px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 0 rgba(255, 255, 255, 0.12);
  margin: 0 auto;
`;

const InnerHpGageWrapper = styled.div`
  width: ${(props) => `${100 * (props.monster_hp / props.monster_max_hp)}%`};
  transition: 0.5s;
  height: 1.8vh;
  border-radius: 3px;
  background-color: ${(props) => handleColorType(props.monster_hp)};
  background-image: -webkit-linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  background-image: linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.2) inset,0 2px 10px 0 rgba(255,255,255,.5) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
`;

export const ElementaryMonster = ({
  monster_hp,
  monster_max_hp,
  question_judgement,
  first_appearance,
  game_result,
  game_description_open
}) => {
  return (
    <>
      {
        !game_description_open && 
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
                  question_judgement={question_judgement}
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

      }
    </>
  );
};
