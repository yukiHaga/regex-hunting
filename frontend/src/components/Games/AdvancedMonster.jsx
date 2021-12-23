import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import AdvancedMonsterImage from '../../images/intermediate.png'; 

const AdvancedWrapper = styled.div`
`;

const AdvancedMonsterWrapper = styled.img`
  width: 600px;
  height: 400px;
  object-fit: contain;
`;

const HpGageWrapper = styled.div`
  width: 600px;
  height: 15px;
  border: 1px solid ${COLORS.GAGE_GRAY};
  box-sizing: border-box;
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLUE};
`;

export const AdvancedMonster = () => {
  return (
    <>
      <AdvancedWrapper>
        <AdvancedMonsterWrapper src={AdvancedMonsterImage} />
        <HpGageWrapper />
      </AdvancedWrapper>
    </>
  );
};
