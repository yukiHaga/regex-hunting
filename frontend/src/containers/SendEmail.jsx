import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { Footer } from '../components/Footers/Footer.jsx';
import { SendEmailFlashMessage } from '../components/FlashMessages/SendEmailFlashMessage.jsx'; 

// Colors
import { COLORS } from '../style_constants.js';

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-top: 45px;
  padding-bottom: 98px;
`;

const SendEmailBoxWrapper = styled.div`
  width: 40%;
  height: 480px;
  background-color: ${COLORS.WHITE};
  margin: 0 auto;
  border-radius: 3px;
`;

const TitleWrapper = styled.h2`
  margin-bottom: 30px;
  font-family: YuGothic;
  font-style: normal;
  color: ${COLORS.BLACK};
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 40px;
  padding-top: 65px;
  width: 70%;
  margin: 0 auto;
`;

const CustomParagraphWrapper = styled.p`
  font-family: YuGothic;
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.BLACK};
  width: 70%;
  margin: 0 auto;
  margin-bottom: 30px;
  overflow-wrap: break-word;
`;

const CustomUl = styled.ul`
  font-family: YuGothic;
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.BLACK};
  width: 70%;
  margin: 0 auto;
`;

export const SendEmail = () => {

  // navigation
  const navigate = useNavigate();

  // location
  const location = useLocation();

  return (
    <>
      <Header /> 
      <MainWrapper>
        <SendEmailBoxWrapper>
          <TitleWrapper>
            メール送信完了
          </TitleWrapper>
          <CustomParagraphWrapper>
            パスワード再設定用のURLをご入力のメールアドレスに送信しました。記載された内容に従って、パスワードの再設定を行なってください。
          </CustomParagraphWrapper>
          <CustomParagraphWrapper>
            メールが届かない場合は以下の場合が考えられます
          </CustomParagraphWrapper>
          <CustomUl>
            <li>迷惑メールフォルダに入ってしまっている場合</li>
            <li>メールアドレスが間違っている場合</li>
            <li>メールアドレスが登録されていない場合</li>
          </CustomUl>
        </SendEmailBoxWrapper>
      </MainWrapper>
      <Footer />
    </>
  );
};
