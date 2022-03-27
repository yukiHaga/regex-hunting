import React from 'react';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { COLORS } from '../../style_constants';

// FakeLink
import { FakeLink } from '../shared_style';

// Responsive
import { WIDTH } from '../../style_constants.js';

const BoundDescriptionSentenceWrapper = styled(FakeLink)`
  width: 70%;
  font-style: normal;
  font-weight: bold;
  font-size: 2.0em;
  color: ${COLORS.SUB};
  margin: 0 auto;
  padding-top: 1.5%;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.1em;
    padding-top: 36%;
  }
`;

const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  animation: infinite 5s ${bounceAnimation};
`;

export const BoundDescriptionSentence = (): JSX.Element => {
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
