import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../style_constants';

const BoundDescriptionSentenceWrapper = styled.div`
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

export const BoundDescriptionSentence = () => {
  return (
    <>
      <BoundDescriptionSentenceWrapper>
        ⬇︎ What's Regex Hunting？⬇︎
      </BoundDescriptionSentenceWrapper>
    </>
  );
};
