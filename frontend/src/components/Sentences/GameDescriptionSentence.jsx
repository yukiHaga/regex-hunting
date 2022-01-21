import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

const GameDescriptionWrapper = styled(DescriptionWrapper)`
  text-align: center;
`;

const GameDescriptionSentenceWrapper = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
  font-size: 24px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  line-height: 36px;
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
