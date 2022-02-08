import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style.js';

// SignUpSentenceWrapepr
const HaveAccountSentenceWrapper = styled(DescriptionWrapper)`
  margin-top: 3%;
  font-size: 0.9em;
`;

export const HaveAccountSentence = ({onClick}) => {
  return (
    <>
      <HaveAccountSentenceWrapper>
        すでにアカウントをお持ちですか？&nbsp;&nbsp; 
        <BlueBaseLink to={'#'} onClick={onClick}>
          ログイン
        </BlueBaseLink>
      </HaveAccountSentenceWrapper>
    </>
  );
};
