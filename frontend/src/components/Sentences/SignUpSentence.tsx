import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style';

// SignUpSentenceWrapepr
const SignUpSentenceWrapper = styled(DescriptionWrapper)`
  margin-top: 3%;
  font-size: 0.9em;
`;

// SignUpSentence
type SignUpSentenceArg = {
  onClick: () => void;
};

export const SignUpSentence = ({onClick}: SignUpSentenceArg): JSX.Element => {
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
