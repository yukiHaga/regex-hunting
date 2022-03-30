import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

// Presentational Components
import { Header } from '../components/Headers/Header';
import { Footer } from '../components/Footers/Footer';
import { SessionFlashMessage } from '../components/FlashMessages/SessionFlashMessage';

// Colors
import { COLORS } from '../style_constants';

import { BottomWrapper } from '../components/shared_style';

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-top: 9.1%;
  padding-bottom: 10%;
`;

const SendEmailBoxWrapper = styled.div`
  width: 40%;
  background-color: ${COLORS.WHITE};
  margin: 0 auto;
  border-radius: 3px;
  padding-bottom: 5%;
`;

const TitleWrapper = styled.h2`
  font-style: normal;
  color: ${COLORS.BLACK};
  width: 70%;
  margin: 0 auto;
  padding-top: 9%;
  padding-bottom: 3%;
`;

const CustomParagraphWrapper = styled.p`
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.BLACK};
  width: 70%;
  margin: 0 auto;
  overflow-wrap: break-word;
  margin-top: 3%;
  margin-bottom: 5%;
`;

const CustomUl = styled.ul`
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.BLACK};
  width: 70%;
  margin: 0 auto;
`;

export const SendEmail = (): JSX.Element => {

  // location
  const location = useLocation();

  return (
    <>
      <Header />
      <MainWrapper>
        <SessionFlashMessage
          location={location}
        />
        <SendEmailBoxWrapper>
          <TitleWrapper>
            メール送信完了
          </TitleWrapper>
          <CustomParagraphWrapper>
            パスワード再設定用のURLをご入力のメールアドレスに送信しました。記載された内容に従って、パスワードの再設定を行なってください。
          </CustomParagraphWrapper>
          <CustomParagraphWrapper>
            メールが届かない場合、以下が考えられます
          </CustomParagraphWrapper>
          <CustomUl>
            <li>迷惑メールフォルダに入っている</li>
            <li>メールアドレスが間違っている</li>
            <li>メールアドレスが登録されていない</li>
          </CustomUl>
        </SendEmailBoxWrapper>
      </MainWrapper>
      <BottomWrapper>
        <Footer />
      </BottomWrapper>
    </>
  );
};
