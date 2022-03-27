import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style';

// SignUpSentenceWrapepr
const HaveAccountSentenceWrapper = styled(DescriptionWrapper)`
  margin-top: 3%;
  font-size: 0.9em;
`;

// HaveAccountSentenceの引数の型
type HaveAccountSentenceArg = {
  onClick: () => void;
};

export const HaveAccountSentence = ({onClick}: HaveAccountSentenceArg): JSX.Element => {
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
