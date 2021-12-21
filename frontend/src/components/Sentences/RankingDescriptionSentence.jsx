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
  font-size: 36px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  line-height: 36px;
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