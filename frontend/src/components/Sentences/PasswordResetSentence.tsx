import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style';

// LoginDescriptionWrapepr
const PasswordResetSentenceWrapper = styled(DescriptionWrapper)`
  margin-bottom: 3%;
  font-size: 0.9em;
`;

export const PasswordResetSentence = (): JSX.Element => {
  return (
    <>
      <PasswordResetSentenceWrapper>
        パスワードを忘れた場合は
        <BlueBaseLink to={'/users/password/new'}>
          こちら
        </BlueBaseLink>
      </PasswordResetSentenceWrapper>
    </>
  );
};
