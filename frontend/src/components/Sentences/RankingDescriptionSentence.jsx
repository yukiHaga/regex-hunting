import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

// Responsive
import { WIDTH } from '../../style_constants.js'; 

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
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.1em;
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
