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
  color: ${COLORS.SUB};
  margin: 0 auto;
`;

export const SubText = () => {
  return (
    <>
      <SubTitleWrapper>
        正規表現を学ぶ狩りに出よう
      </SubTitleWrapper>
    </>
  );
};
