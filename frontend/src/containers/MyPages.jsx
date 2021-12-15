import React, { Fragment, useContext, useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@material-ui/lab/Alert';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Header.jsx';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

const FakeBlock = styled.div`
  width: 100%;
  height: 55px;
  margin-bottom: 8px;
`

const AlertWrapper = styled.div`
  display: flex;
  justify-content: end;
  z-index: 1;
`;

const CustomAlert = styled(Alert)`
  width: 180px;
  margin-right: 16px;
  pointerEvents: 'none';
`


export const MyPages = () => {


  // navigateのパラメータを取得
  const location = useLocation();
  const [ flash, setFlash ] = useState(location.state);

  const handleFlash = () => (
    setFlash({
      type: 'success',
      message: 'ログインしました。',
      display: false
    })
  );

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: {userState},
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  useEffect(() => {
    if(userState.session === false){
      dispatch({ type: requestUserActionTyps.REQUEST });
      checkLoginStatus().then((data) => {
        dispatch({
          type: requestUserActionTyps.REQUEST_SUCCESS,
          payload: {
            session: data.session,
            user: data.user
            flashState: data.flashState
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
    userState.session,
    requestUserActionTyps.REQUEST, 
    requestUserActionTyps.REQUEST_SUCCESS,
    requestUserActionTyps.REQUEST_FAILURE
  ]);

  console.log(flash);
 
  return (
    <>
      <Header /> 
      <FakeBlock />
      
      <Slide 
        direction="left" 
        in={Boolean(flash.display)} 
        timeout={{ enter: 1200, exit: 1200 }} 
        mountOnEnter 
        unmountOnExit
        addEndListener={() => (setTimeout(handleFlash, 4000))}
      >
        <AlertWrapper>
          <CustomAlert severity="success">
            {location.state.message}
          </CustomAlert>
        </AlertWrapper>
      </Slide>
    </>
  );
};
