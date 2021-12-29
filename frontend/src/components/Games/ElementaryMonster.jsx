import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import ElementaryMonsterImage from '../../images/elementary.png'; 
import { PLAYER_STATUS } from '../../constants.js';

const ElementaryWrapper = styled.div`
`;

const ElementaryMonsterWrapper = styled.img`
  width: 211px;
  height: 205px;
  object-fit: contain;
`;

const HpGageWrapper = styled.div`
  width: 160px;
  height: 15px;
  border: 1px solid ${COLORS.GAGE_GRAY};
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLACK};
`;

const InnerHpGageWrapper = styled.div`
  width: ${(props) => `${props.width}px`};
  height: 15px;
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLUE};
`;

export const ElementaryMonster = ({
  monster: {
    name,
    max_hp,
    attack,
    defence
  },
  question_finish 
}) => {

  const initialState = {
    name: name,
    hp: max_hp,
    max_hp: max_hp,
    width: 160,
    attack: attack,
    defence: defence,
  }

  const [ monsterState, setMonsterState ] = useState(initialState);

  // モンスターに与えるダメージを計算する関数
  // プレイヤーのアタックは20で固定とする
  const calculateDamage = (defence) => {
    const damage = PLAYER_STATUS.ATTACK - defence;
    return damage;
  }

  // 問題終了ごとに、ダメージを計算して画面表示させるためのuseEffect
  useEffect(() => {
    if(question_finish) {
      const current_hp = monsterState.hp - calculateDamage(monsterState.defence);
      setMonsterState((prev) => ({
        ...prev,
        width: prev.width * (current_hp / max_hp)  
      }));
    }
  }, [
    max_hp,
    monsterState.defence,
    monsterState.hp,
    question_finish
  ])
  console.log(monsterState);

  return (
    <>
      <ElementaryWrapper>
        <ElementaryMonsterWrapper src={ElementaryMonsterImage} />
        <HpGageWrapper>
          <InnerHpGageWrapper width={monsterState.width}/>
        </HpGageWrapper>
      </ElementaryWrapper>
    </>
  );
};
