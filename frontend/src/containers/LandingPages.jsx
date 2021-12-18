import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Image
import MainTitleImage from '../images/main_title.png';
import BackGroundImage from '../images/background.png';
import MainMonsterImage from '../images/intermediate.png';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { SubTitle } from '../components/SubTitle.jsx';
import { StartButton } from '../components/Buttons/StartButton.jsx'
import { Footer } from '../components/Footer.jsx';
import { LoginDialog } from '../components/Dialogs/LoginDialog.jsx';
import { SignUpDialog } from '../components/Dialogs/SignUpDialog.jsx';
import { SessionFlashMessage } from '../components/FlashMessages/SessionFlashMessage.jsx';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// メインのラッパー
const MainWrapper = styled.div`
  text-align: center;
`;

// メインタイトル画像
const MainTitleImageCover = styled.img`
  width: 1000px;
  height: 180px;
  object-fit: contain;
  margin-top: 145px;
`;

// 背景画像
const BackGroundImageCover = styled.img`
  width: 1790px;
  height: 750px;
  position: absolute;
  top: 55px;
  left: -350px;
  z-index: -4;
`;

// フィルター
const Filter = styled.span`
  width: 1790px;
  height: 750px;
  position: absolute;
  top: 55px;
  left: -350px;
  z-index: -2;
  background-color: rgba(102,102,102,0.5)
`;

// メインモンスター画像
const MainMonsterImageCover = styled.img`
  width: 1000px;
  height: 700px;
  object-fit: contain;
  z-index: -3;
  position: absolute;
  top: 55px;
  left: 200px;
`;

// フラッシュメッセージでレイアウトが変化しないためのブロック要素
const FakeBlock = styled.div`
  height: 56px;
`;

export const LandingPages = () => { 

  // モーダルに関するstateの初期値
  const loginInitialState = {
    isOpenDialog: false,
    modalType: ""
  }

  // モーダルを管理するstate
  const [state, setState] = useState(loginInitialState);

  // useContext
  const {
    requestUserState: { sessionState }, 
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();

  // 初めてLPページに訪れた場合、ログインしていないので、
  // 2回目のdispatchのdata.sessionはfalseとなる
  useEffect(() => {
    if(sessionState === false){
      dispatch({ type: requestUserActionTyps.REQUEST });
      checkLoginStatus().then((data) => {
        dispatch({
          type: requestUserActionTyps.REQUEST_SUCCESS,
          payload: {
            session: data.session,
            user: data.user,
          }
        });
      }).catch((e) => {
        if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
          dispatch({
            type: requestUserActionTyps.REQUEST_FAILURE,
            payload: {
              errors: e.response.data.errors
            }
          });
        } else {
          throw e;
        }
      })
    }
  }, [
    dispatch, 
    sessionState,
    requestUserActionTyps.REQUEST, 
    requestUserActionTyps.REQUEST_SUCCESS,
    requestUserActionTyps.REQUEST_FAILURE
  ]);

  return (
    <>
      <Header onClickLink={(modalType) => setState({
        isOpenDialog: true,
        modalType: modalType
      })}/>
      <FakeHeader />
      <FakeBlock>
        <SessionFlashMessage
          location={location}
          navigate={navigate}
          url='/'
        />
      </FakeBlock>
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
              modalType: ""
            })}
            onClick={() => setState({
              isOpenDialog: true,
              modalType: "signUp"
            })}
          />
      }
      {
        state.isOpenDialog && state.modalType === "signUp" &&
          <SignUpDialog 
            isOpen={state.isOpenDialog}
            onClose={() => setState({
              isOpenDialog: false,
              modalType: ""
            })}
            onClick={() => setState({
              isOpenDialog: true,
              modalType: "login"
            })}
          />
      }
    </>
  );
};
