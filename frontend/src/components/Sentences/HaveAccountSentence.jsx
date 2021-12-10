import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style.js';

// SignUpSentenceWrapepr
const HaveAccountSentenceWrapper = styled(DescriptionWrapper)`
  margin-top: 15px;
`;

export const HaveAccountSentence = ({onClickLoginModalLink}) => {
  console.log(onClickLoginModalLink);
  return (
    <>
      <HaveAccountSentenceWrapper>
        すでにアカウントをお持ちですか？&nbsp;&nbsp; 
        <BlueBaseLink to={'#'} onClick={onClickLoginModalLink}>
          ログイン
        </BlueBaseLink>
      </HaveAccountSentenceWrapper>
    </>
  );
};
