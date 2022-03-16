import React, { Fragment, useState, useEffect, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { Footer } from '../components/Footers/Footer.jsx';
import { RankingBox } from '../components/Games/RankingBox';
import { LoginDialog } from '../components/Dialogs/LoginDialog.jsx';
import { SignUpDialog } from '../components/Dialogs/SignUpDialog.jsx';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// Colors
import { COLORS } from '../style_constants.js';

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// ランキングを取得するAPIコール関数
import { getRanking } from '../apis/ranking.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-top: 3%;
  padding-bottom: 2.65%;
`;

export const Rankings = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: { 
      sessionState,
      battleAudioState
    },
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  const initialState = {
    topTenElementary: [],
    topTenIntermediate: [],
    topTenAdvanced: [],
    currentTopTenArray: [],
    difficultyTitle: "初級編",
    prevDifficultyTitle: "上級編",
    nextDifficultyTitle: "中級編",
    slideIn: false,
    slideOut: false,
    direction: "",
  };

  // ランキングを制御するstate
  const [rankingState, setRankingState] = useState(initialState);

  // モーダルに関するstateの初期値
  const loginInitialState = {
    isOpenDialog: false,
    modalType: ""
  }

  // モーダルを管理するstate
  const [state, setState] = useState(loginInitialState);

  // ブラウザをリロードしてもログイン状態を維持するためのuseEffect
  useLayoutEffect(() => {
    if(sessionState === false){
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

  // ランキングデータを取得するためのuseEffect
  useLayoutEffect(() => {
    getRanking().then((data) => {
      setRankingState((prev) => ({
        ...prev,
        topTenElementary: data.top_ten_elementary,
        topTenIntermediate: data.top_ten_intermediate,
        topTenAdvanced: data.top_ten_advanced,
        currentTopTenArray: data.top_ten_elementary,
        difficultyTitle: "初級編"
      }));
    }).catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
        setRankingState((prev) => ({
          ...prev,
        }));
      } else {
        throw e;
      }
    })
  }, [
  ]);

  // ゲーム中のユーザーがトップページに戻ったときに
  // 音を消すuseEffect
  useEffect(() => {
    if(battleAudioState.play) {
      battleAudioState.audio.pause();
      battleAudioState.audio.currentTime = 0;
    }
  },[
    battleAudioState.play,
    battleAudioState.audio
  ])
 
  return (
    <>
      <Header 
        onClickLink={(modalType) => setState({
          isOpenDialog: true,
          modalType: modalType
        })}
      /> 
      <MainWrapper>
        <RankingBox
          currentTopTenArray={rankingState.currentTopTenArray}
          difficultyTitle={rankingState.difficultyTitle}
          setRankingState={setRankingState}
          rankingState={rankingState}
        />
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
