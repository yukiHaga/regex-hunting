import React, { memo } from 'react';
import styled from 'styled-components';
import { COLORS } from '../style_constants';

// 390pxはiphone12
const SubTextWrapper = styled.div`
  width: 70%;
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  font-size: 2.5em;
  color: ${(props) => props.color || COLORS.BLACK};
  margin: 0 auto;
  margin-top: 1%;
  @media (max-width: 390px) {
    font-size: 1.1em;
    margin-top: 3%;  
  }
`;

export const SubText = memo(({color, children}) => {
  return (
    <>
      <SubTextWrapper color={color}>
        {children}
      </SubTextWrapper>
    </>
  );
});
