import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';

// ログイン関係のAPIコール関数
import { postUserSession, } from '../apis/login'; 
// deleteUserSession 

// Images
import MainTitleImage from '../images/main_title.png';

// Colors
import { COLORS } from '../style_constants.js';

// Header
import { Header } from '../components/Header.jsx'

// メインのラッパー
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 190px;
`;

// メイン画像に対応するコンポーネント
const MainImageCover = styled.img`
  width: 1000px;
  height: 180px;
  object-fit: contain;
`;

export const LandingPages = () => { 

  // ユーザーをログインさせる。
  useEffect(() => {
    postUserSession({
      user: {
        email: 'glen@stroman.com',
        password: '3150test' 
      }
    })
    .then((data) => {
      console.log(data);
      console.log("ログインが成功した");
    })
  }, []);

  return (
    <>
      <Header />
      <MainWrapper>
        <MainImageCover src={MainTitleImage} alt="main cover"/>
      </MainWrapper>
    </>
  );
};
