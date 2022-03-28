import React, { ReactNode } from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style';

// Responsive
import { WIDTH } from '../../style_constants';

const RankingDescriptionWrapper = styled(DescriptionWrapper)`
  text-align: center;
`;

const RankingDescriptionSentenceWrapper = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
  font-size: 2.3em;
  font-style: normal;
  font-weight: bold;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.1em;
  }
`;

export const RankingDescriptionSentence = ({children}: {children: ReactNode}): JSX.Element => {
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
