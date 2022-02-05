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
  font-size: 1.9em;
  color: ${(props) => props.color || COLORS.BLACK};
  margin: 0 auto;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.1em;
    margin-top: 3%;  
  }
  letter-spacing: 0.04em;
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
