import React, { Fragment, useEffect, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { Footer } from '../components/Footers/Footer.jsx';
import { AccountSettingBox } from '../components/Games/AccountSettingBox.jsx';
import CircularProgress from '@mui/material/CircularProgress';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// REQUEST_STATE
import { REQUEST_STATE } from '../constants';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// Colors
import { COLORS } from '../style_constants.js';

const FakeBlock = styled.div`
  background-color: ${COLORS.SUB};
  height: 56px;
`;

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-bottom: 43px;
`;

export const AccountSettings = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState,
    requestUserState: { 
      requestState,
      sessionState,
      userState: { user },
      battleAudioState
    },
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // ブラウザをリロードしてもログイン状態を維持するためのuseEffect
  // requestUserActionTyps.REQUESTとかは、reducerのファイルで定義した定数
  useLayoutEffect(() => {
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
  ]);

  // マウント後、直ぐにuseEffectが実行されるので、
  // マウント時には、フォームがマウントされるが、すぐにCircularが表示される。
  // その後、フォームがまたマウントされる
  return (
    <>
      {
        requestState === REQUEST_STATE.LOADING ?
          <CircularProgress />
        :
          <>
            <Header /> 
            <FakeHeader />
            <FakeBlock />
            <MainWrapper>
              <AccountSettingBox 
                requestUserState={requestUserState}
                user={user}
              />
            </MainWrapper>
            <Footer />
          </>
      }
    </>
  );
};
