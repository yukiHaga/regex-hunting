import React, { Fragment, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

export const Games = () => {

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

  // React Routerで画面遷移するとユーザーが保持できないので、
  // useEffectで再度リクエストを出す。
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
      <Header />
      <FakeHeader />
      ゲーム画面
    </>
  );
};
