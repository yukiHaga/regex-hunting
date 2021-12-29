import React from 'react';
import styled, { keyframes } from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import ElementaryMonsterImage from '../../images/elementary.png'; 

const ElementaryWrapper = styled.div`
`;

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
`;

const InnerHpGageWrapper = styled.div`
  width: ${(props) => `${160 * (props.monster_hp / props.monster_max_hp)}px`};
  transition: 0.5s;
  height: 15px;
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLUE};
`;

export const ElementaryMonster = ({
  monster_hp,
  monster_max_hp,
  question_finish
}) => {


  return (
    <>
      <ElementaryWrapper>
        <ElementaryMonsterWrapper 
          src={ElementaryMonsterImage} 
          question_finish={question_finish}
        />
        <HpGageWrapper>
          <InnerHpGageWrapper 
            monster_hp={monster_hp} 
            monster_max_hp={monster_max_hp}
          />
        </HpGageWrapper>
      </ElementaryWrapper>
    </>
  );
};
