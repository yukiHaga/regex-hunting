import React, { Fragment, useContext, useEffect } from 'react';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { SessionFlashMessage } from '../components/FlashMessages/SessionFlashMessage';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

export const MyPages = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: {sessionState, userState, flashState},
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  const handleFlash = (userState) => {
    dispatch({
      type: requestUserActionTyps.REQUEST_SUCCESS,
      payload: {
        session: false,
        user: userState.user,
        flash: { 
          display: false,
          success: "" 
        }
      }
    });
  };

  useEffect(() => {
    if(sessionState === false){
      dispatch({ type: requestUserActionTyps.REQUEST });
      checkLoginStatus().then((data) => {
        dispatch({
          type: requestUserActionTyps.REQUEST_SUCCESS,
          payload: {
            session: data.session,
            user: data.user,
            flash: data.flash
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
      <Header /> 
      <FakeHeader />
      <SessionFlashMessage 
        flashState={flashState} 
        handleFlash={handleFlash} 
        userState={userState}
      /> 
    </>
  );
};
