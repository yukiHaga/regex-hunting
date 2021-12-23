import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import IntermediateMonsterImage from '../../images/intermediate.png'; 

const IntermediateWrapper = styled.div`
`;

const IntermediateMonsterWrapper = styled.img`
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

export const IntermediateMonster = () => {
  return (
    <>
      <IntermediateWrapper>
        <IntermediateMonsterWrapper src={IntermediateMonsterImage} />
        <HpGageWrapper />
      </IntermediateWrapper>
    </>
  );
};
