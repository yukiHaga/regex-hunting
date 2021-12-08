import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

// ログイン関係のAPIコール関数
// deleteUserSession 
import { postUserSession } from '../apis/login'; 

// Image
import MainTitleImage from '../images/main_title.png';
import BackGroundImage from '../images/background.png';
import MainMonsterImage from '../images/intermediate.png';

// Presentational Components
import { Header } from '../components/Header.jsx';
import { SubTitle } from '../components/SubTitle.jsx';
import { StartButton } from '../components/Buttons/StartButton.jsx'
import { Footer } from '../components/Footer.jsx';
import { LoginDialog } from '../components/LoginDialog.jsx';

// メインのラッパー
const MainWrapper = styled.div`
  position: relative;  
  text-align: center;
`;

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

export const LandingPages = () => { 

  // モーダルに関するstateの初期値
  const loginInitialState = {
    isOpenDialog: false,
    modalType: null
  }

  // モーダルを管理するstate
  const [state, setState] = useState(loginInitialState);

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
      <Header onClickModalLink={(modalType) => setState({
        isOpenDialog: true,
        modalType: modalType
      })}/>
      <MainWrapper>
        <MainTitleImageCover src={MainTitleImage} alt="main-title"/>
        <Filter />
        <MainMonsterImageCover src={MainMonsterImage} alt="main-monster" />
        <BackGroundImageCover src={BackGroundImage} alt="back-ground"/> 
        <SubTitle />
        <StartButton />
      </MainWrapper>
      <Footer />
      {
        state.isOpenDialog && state.modalType === "login" &&
          <LoginDialog 
            isOpen={state.isOpenDialog}
            onClose={() => setState({
              isOpenDialog: false,
              modalType: null
            })}
          />
      }
    </>
  );
};
