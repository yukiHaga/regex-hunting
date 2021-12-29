import React, { useState, useEffect } from 'react';
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
  width: ${(props) => props.question_finish || '160px'};
  height: 15px;
  border-radius: 3px;
  background-color: ${COLORS.LIGHT_BLUE};
`;

export const ElementaryMonster = ({
  question_finish 
}) => {


  return (
    <>
      <ElementaryWrapper>
        <ElementaryMonsterWrapper src={ElementaryMonsterImage} />
        <HpGageWrapper>
          <InnerHpGageWrapper question_finish={question_finish}/>
        </HpGageWrapper>
      </ElementaryWrapper>
    </>
  );
};
