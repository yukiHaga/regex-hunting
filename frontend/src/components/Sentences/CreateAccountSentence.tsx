import React from 'react';
import styled from 'styled-components';

// DescriptonWrapper
import { DescriptionWrapper } from '../shared_style';

// BlueBaseLink
import { BlueBaseLink } from '../shared_style';

const CreateAccountSentenceWrapper = styled(DescriptionWrapper)`
  text-align: center;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 5%;
`;

const CreateAccountAgreeSentenceWrapper = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
  font-size: 0.9em;
`;

export const CreateAccountSentence = (): JSX.Element => {
  return (
    <>
      <CreateAccountSentenceWrapper>
        <CreateAccountAgreeSentenceWrapper>
          アカウントを作成することにより、
          <BlueBaseLink to="/policy" target="_blank" rel="noopener noreferrer">
            利用規約
          </BlueBaseLink>
          および
          <BlueBaseLink to="/privacy-policy" target="_blank" rel="noopener noreferrer">
            プライバシーポリシー
          </BlueBaseLink>
          に同意するものとします。
          <br />ユーザー名はランキングに表示されます。
          (アカウント設定で編集や非表示が可能です)
        </CreateAccountAgreeSentenceWrapper>
      </CreateAccountSentenceWrapper>
    </>
  );
};
