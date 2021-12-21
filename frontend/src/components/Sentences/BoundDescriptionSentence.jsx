import React from 'react';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { COLORS } from '../../style_constants';
// FakeLink
import { FakeLink } from '../shared_style.js';

const BoundDescriptionSentenceWrapper = styled(FakeLink)`
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

const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  animation: infinite 5s ${bounceAnimation};
`;

export const BoundDescriptionSentence = () => {
  return (
    <>
      <BouncyDiv>
        <BoundDescriptionSentenceWrapper>
          ⬇︎ What's Regex Hunting？⬇︎
        </BoundDescriptionSentenceWrapper>
      </BouncyDiv>
    </>
  );
};
