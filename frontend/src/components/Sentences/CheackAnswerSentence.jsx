import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style.js';

// SignUpSentenceWrapepr
const CheackAnswerSentenceWrapper = styled(DescriptionWrapper)`
  margin-top: 15px;
`;

export const CheackAnswerSentence = ({onClick}) => {
  return (
    <>
      <CheackAnswerSentenceWrapper>
        <BlueBaseLink to={'#'} onClick={onClick}>
          問題の答えを確認する
        </BlueBaseLink>
      </CheackAnswerSentenceWrapper>
    </>
  );
};
