import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style.js';

// LoginDescriptionWrapepr
const CreateAccountSentenceWrapper = styled(DescriptionWrapper)`
  margin-bottom: 20px;
`;

const CreateAccountAgreeSentenceWrapper = styled(DescriptionWrapper)`
`;

const CreateAccountRankingSentenceWrapper = styled(DescriptionWrapper)`
`;

// に同意するものとします。
export const CreateAccountSentence = () => {
  return (
    <>
      <CreateAccountSentenceWrapper>
        <CreateAccountAgreeSentenceWrapper>
          アカウントを作成することにより、
          <BlueBaseLink to={'/users/password/new'}>
            利用規約
          </BlueBaseLink>
          および
          <BlueBaseLink to={'/users/password/new'}>
            プライバシーポリシー
          </BlueBaseLink>
        </CreateAccountAgreeSentenceWrapper>
        <CreateAccountRankingSentenceWrapper>
          ユーザー名はランキングに表示されます。（設定で非表示が可能です）
        </CreateAccountRankingSentenceWrapper>
      </CreateAccountSentenceWrapper>
    </>
  );
};
