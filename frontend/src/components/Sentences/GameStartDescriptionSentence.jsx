import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

const GameStartDescriptionWrapper = styled(DescriptionWrapper)`
  text-align: center;
`;

const GameStartDescriptionSentenceWrapper = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
  font-size: 2.3em;
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  @media (max-width: 390px) {
    font-size: 0.9em;
  }
`;

export const GameStartDescriptionSentence = ({children}) => {
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
