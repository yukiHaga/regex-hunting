import React, { ReactNode } from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style';

// Responsive
import { WIDTH } from '../../style_constants.js';

const GameDescriptionWrapper = styled(DescriptionWrapper)`
  margin-top: 3%;
  text-align: center;
`;

const GameDescriptionSentenceWrapper = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
  font-size: 1.5em;
  font-style: normal;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 0.8em;
  }
`;

export const GameDescriptionSentence = ({children}: {children: ReactNode}): JSX.Element => {
  return (
    <>
      <GameDescriptionWrapper>
        <GameDescriptionSentenceWrapper>
          {children}
        </GameDescriptionSentenceWrapper>
      </GameDescriptionWrapper>
    </>
  );
};
