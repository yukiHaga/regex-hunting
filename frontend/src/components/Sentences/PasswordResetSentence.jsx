import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style.js';

// LoginDescriptionWrapepr
const PasswordResetSentenceWrapper = styled(DescriptionWrapper)`
  margin-top: 15px;
  margin-bottom: 20px;
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
