import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../style_constants';

const SubTextWrapper = styled.div`
  width: 624px;
  height: 72px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 72px;
  color: ${(props) => props.color || COLORS.BLACK};
  margin: 0 auto;
  margin-top: 15px;
`;

export const SubText = ({color, children}) => {
  return (
    <>
      <SubTextWrapper color={color}>
        {children}
      </SubTextWrapper>
    </>
  );
};
