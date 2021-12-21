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
  border: 1px solid ${COLORS.SUB};
  box-sizing: border-box;
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLUE};
`;

export const ElementaryMonster = () => {
  return (
    <>
      <ElementaryWrapper>
        <ElementaryMonsterWrapper src={ElementaryMonsterImage} />
        <HpGageWrapper />
      </ElementaryWrapper>
    </>
  );
};
