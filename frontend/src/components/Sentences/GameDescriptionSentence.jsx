import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

const GameDescriptionWrapper = styled(DescriptionWrapper)`
  margin-top: 15px;
  text-align: center;
`;

const GameDescriptionSentenceWrapper = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
  font-size: 1.5em;
  font-family: YuGothic;
  font-style: normal;
  @media (max-width: 390px) {
    font-size: 0.8em;
  }
`;

export const GameDescriptionSentence = ({children}) => {
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
