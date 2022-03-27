import React, { ReactNode } from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style';

// Responsive
import { WIDTH } from '../../style_constants.js';

const GameStartDescriptionWrapper = styled(DescriptionWrapper)`
  text-align: center;
`;

const GameStartDescriptionSentenceWrapper = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
  font-size: 2.3em;
  font-style: normal;
  font-weight: bold;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 0.9em;
  }
`;

export const GameStartDescriptionSentence = ({children}: {children: ReactNode}): JSX.Element => {
  return (
    <>
      <GameStartDescriptionWrapper>
        <GameStartDescriptionSentenceWrapper>
          {children}
        </GameStartDescriptionSentenceWrapper>
      </GameStartDescriptionWrapper>
    </>
  );
};
