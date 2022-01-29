import React, { memo } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../style_constants';

// Responsive
import { WIDTH } from '../../style_constants.js';

// 390pxはiphone12
const SubTitleSentenceWrapper = styled.div`
  width: 70%;
  font-style: normal;
  font-weight: bold;
  font-size: 2.0em;
  color: ${(props) => props.color || COLORS.BLACK};
  margin: 0 auto;
  margin-top: 1%;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.1em;
    margin-top: 3%;  
  }
`;

export const SubTitleSentence = memo(({color, children}) => {
  return (
    <>
      <SubTitleSentenceWrapper color={color}>
        {children}
      </SubTitleSentenceWrapper>
    </>
  );
});
