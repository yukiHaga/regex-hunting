import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style.js';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style.js';

const CreateAccountSentenceWrapper = styled(DescriptionWrapper)`
  margin-top: 10px;
  padding 0 24px;
  text-align: center;
  margin-bottom: 5px;
`;

const CreateAccountAgreeSentenceWrapper = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
`;

export const CreateAccountSentence = () => {
  return (
    <>
      <CreateAccountSentenceWrapper>
        <CreateAccountAgreeSentenceWrapper>
          アカウントを作成することにより、
          <BlueBaseLink to={'/policy'}>
            利用規約
          </BlueBaseLink>
          および<br/>
          <BlueBaseLink to={'/privacy-policy'}>
            プライバシーポリシー
          </BlueBaseLink>
          に同意するものとします。
          <br/>ユーザー名はランキングに表示されます。
          <br/>(アカウント設定で編集や非表示が可能です)
        </CreateAccountAgreeSentenceWrapper>
      </CreateAccountSentenceWrapper>
    </>
  );
};
