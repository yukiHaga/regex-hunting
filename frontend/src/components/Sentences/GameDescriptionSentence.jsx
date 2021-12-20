import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

const GameDescriptionWrapper = styled(DescriptionWrapper)`
  text-align: center;
  margin-bottom: 16px;
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

export const GameDescriptionSentence = () => {
  return (
    <>
      <GameDescriptionWrapper>
        <GameDescriptionSentenceWrapper>
          Regex Huntingは、凶悪なモンスターを倒しながら<br/>
          正規表現が学べるゲーム型学習サービスです。
        </GameDescriptionSentenceWrapper>
      </GameDescriptionWrapper>
    </>
  );
};
