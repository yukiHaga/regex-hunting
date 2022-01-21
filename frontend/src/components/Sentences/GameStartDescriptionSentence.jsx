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
  font-size: 36px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  line-height: 36px;
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
