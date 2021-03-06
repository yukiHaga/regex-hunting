import React, { Fragment, useEffect, useLayoutEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Presentational Components
import { Header } from "../components/Headers/Header";
import { Footer } from "../components/Footers/Footer";
import { AccountSettingBox } from "../components/AccountSettings/AccountSettingBox";
import { CircularMask } from "../components/loads/CircularMask";

// Contextオブジェクト
import { UserContext } from "../context/UserProvider";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from "../apis/checkLoginStatus";

// REQUEST_STATE
import { REQUEST_STATE } from "../constants";

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from "../constants";

// Colors
import { COLORS } from "../style_constants";

import { BottomWrapper, CustomWrapper } from "../components/shared_style";

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-bottom: 5%;
  padding-top: 5%;
`;

export const AccountSettings = (): JSX.Element => {
  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const {
    requestUserState,
    requestUserState: {
      requestState,
      sessionState,
      userState: { user },
      battleAudioState,
    },
    dispatch,
    requestUserActionTyps,
  } = useContext(UserContext);

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();

  // ブラウザをリロードしてもログイン状態を維持するためのuseEffect
  // requestUserActionTyps.REQUESTとかは、reducerのファイルで定義した定数
  useLayoutEffect(() => {
    if (sessionState === false) {
      dispatch({ type: requestUserActionTyps.REQUEST });
      checkLoginStatus()
        .then((data) => {
          dispatch({
            type: requestUserActionTyps.REQUEST_SUCCESS,
            payload: {
              session: data.session,
              user: data.user,
            },
          });
          if (!data.session && location.key === "default") {
            navigate("/", {
              state: { display: true, success: "ログインしてください。" },
            });
          }
        })
        .catch((e) => {
          if (e.response.status === HTTP_STATUS_CODE.NOT_FOUND) {
            dispatch({
              type: requestUserActionTyps.REQUEST_FAILURE,
              payload: {
                errors: e.response.data.errors,
              },
            });
          } else {
            throw e;
          }
        });
    }
  }, [
    dispatch,
    sessionState,
    requestUserActionTyps.REQUEST,
    requestUserActionTyps.REQUEST_SUCCESS,
    requestUserActionTyps.REQUEST_FAILURE,
    navigate,
    location.key,
  ]);

  // ゲーム中のユーザーがトップページに戻ったときに
  // 音を消すuseEffect
  useEffect(() => {
    if (battleAudioState.play) {
      battleAudioState.audio.pause();
      battleAudioState.audio.currentTime = 0;
    }
  }, [battleAudioState.play, battleAudioState.audio]);

  // マウント後、直ぐにuseEffectが実行される為、
  // マウント時には、フォームがマウントされるが、すぐにCircularが表示される。
  // その後、フォームがまたマウントされる
  return (
    <>
      <CustomWrapper>
        {requestState === REQUEST_STATE.LOADING ? (
          <CircularMask />
        ) : (
          <>
            <Header />
            <MainWrapper>
              <AccountSettingBox
                requestUserState={requestUserState}
                user={user}
              />
            </MainWrapper>
            <BottomWrapper>
              <Footer />
            </BottomWrapper>
          </>
        )}
      </CustomWrapper>
    </>
  );
};
