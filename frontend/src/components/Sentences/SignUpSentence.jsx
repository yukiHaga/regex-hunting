import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style.js';

// SignUpSentenceWrapepr
const SignUpSentenceWrapper = styled(DescriptionWrapper)`
  margin-top: 15px;
`;

export const SignUpSentence = ({onClick}) => {
  return (
    <>
      <SignUpSentenceWrapper>
        アカウントをお持ちではないですか？&nbsp;&nbsp; 
        <BlueBaseLink to={'#'} onClick={onClick}>
          新規登録
        </BlueBaseLink>
      </SignUpSentenceWrapper>
    </>
  );
};
