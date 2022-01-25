import React from 'react';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { COLORS } from '../../style_constants';
// FakeLink
import { FakeLink } from '../shared_style.js';

const BoundDescriptionSentenceWrapper = styled(FakeLink)`
  width: 70%;
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  font-size: 2.5em;
  color: ${COLORS.SUB};
  @media (max-width: 390px) {
    font-size: 1.1em;
  }
  margin: 0 auto;
  padding-bottom: 7px;
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
