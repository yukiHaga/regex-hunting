import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';

// ログイン関係のAPIコール関数
// deleteUserSession 
import { postUserSession, } from '../apis/login'; 

// Image
import MainTitleImage from '../images/main_title.png';
import BackGroundImage from '../images/background.png';
import MainMonsterImage from '../images/intermediate.png';

// Colors
// import { COLORS } from '../style_constants.js';

// Header
import { Header } from '../components/Header.jsx';

// メインのラッパー
const MainWrapper = styled.div`
  position: relative;  
  text-align: center;
`;

//  display: flex;
//  justify-content: center;
//  position: relative;

// メインタイトル画像
const MainTitleImageCover = styled.img`
  width: 1000px;
  height: 180px;
  object-fit: contain;
  margin-top: 250px;

`;

// 背景画像
const BackGroundImageCover = styled.img`
  width: 1790px;
  height: 750px;
  position: absolute;
  top: 52px;
  left: -350px;
  z-index: -3;
`;

// フィルター
const Filter = styled.span`
  width: 1790px;
  height: 750px;
  position: absolute;
  top: 52px;
  left: -350px;
  z-index: -1;
  background-color: rgba(102,102,102,0.5)
`;

// メインモンスター画像
const MainMonsterImageCover = styled.img`
  width: 1000px;
  height: 700px;
  object-fit: contain;
  z-index: -2;
  position: absolute;
  top: 52px;
  left: 200px;
`;

// サブタイトル
const SubTitle = styled.div`
  width: 624px;
  height: 72px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 72px;
  color: #F6F6DC;
  margin: 0 auto;
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
//  <SubTitle>正規表現を学ぶ狩りに出よう</SubTitle>
//  </MainTitleWrapper>
return (
  <>
    <Header />
    <MainWrapper>
      <MainTitleImageCover src={MainTitleImage} alt="main-title"/>
      <Filter />
      <MainMonsterImageCover src={MainMonsterImage} alt="main-monster" />
      <BackGroundImageCover src={BackGroundImage} alt="back-ground"/> 
      <SubTitle>
        正規表現を学ぶ狩りに出よう
      </SubTitle>
    </MainWrapper>
    </>
  );
};
