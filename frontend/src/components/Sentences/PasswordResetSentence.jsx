import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style.js';

// LoginDescriptionWrapepr
const PasswordResetSentenceWrapper = styled(DescriptionWrapper)`
  margin-bottom: 3%;
`;

export const PasswordResetSentence = () => {
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
