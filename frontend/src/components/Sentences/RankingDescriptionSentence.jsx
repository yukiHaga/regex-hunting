import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

const RankingDescriptionWrapper = styled(DescriptionWrapper)`
  text-align: center;
`;

const RankingDescriptionSentenceWrapper = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
  font-size: 2.3em;
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  @media (max-width: 390px) {
    font-size: 1.2em;
  }
`;

export const RankingDescriptionSentence = ({children}) => {
  return (
    <>
      <RankingDescriptionWrapper>
        <RankingDescriptionSentenceWrapper>
          {children}
        </RankingDescriptionSentenceWrapper>
      </RankingDescriptionWrapper>
    </>
  );
};
