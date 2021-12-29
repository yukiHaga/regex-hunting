import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import ElementaryMonsterImage from '../../images/elementary.png'; 

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
  width: ${(props) => `${160 * (props.monster_hp / props.monster_max_hp)}px`};
  transition: 0.5s;
  height: 15px;
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLUE};
`;

export const ElementaryMonster = ({
  monster_hp,
  monster_max_hp
}) => {


  return (
    <>
      <ElementaryWrapper>
        <ElementaryMonsterWrapper src={ElementaryMonsterImage} />
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
