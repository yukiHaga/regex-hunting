import React, { Fragment, useContext, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { SessionFlashMessage } from '../components/FlashMessages/SessionFlashMessage.jsx';

// Images
import TemporaryUserImage from '../images/temporary_user_image.png';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

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
  display: flex;
`;

// ステータスのラッパー
const StatusWrapper = styled.div`
  width: 722px;
  height: 244px;
  border-radius: 3px;
  background-color: #FFFFFF;
  margin-left: 40px;
  display: flex
`;

// イメージのラッパー
const ImageWrapper = styled.div`
  width: 220px;
  height: 220px;
  background-color: ${COLORS.GRAY};
  border-radius: 3px;
`;

// カスタムイメージ
// imageタグだと縦横比を維持できない
// background-imageだと縦横比を維持できる
const CustomImage = styled.div`
  background-image: url(${TemporaryUserImage});
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
`;

const TableWrapper = styled.div`
  width: 502px;
  height: 220px;
  background-color: ${COLORS.GAGE_GRAY};
  border-radius: 3px;
`;

export const MyPages = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: { sessionState },
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

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

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();

  return (
    <>
      <Header /> 
      <FakeHeader />
      <FakeBlock>
        <SessionFlashMessage
          location={location}
          navigate={navigate}
          url='/my-page'
        />
      </FakeBlock>
      <MainWrapper>
        <StatusWrapper>
          <ImageWrapper>
            <CustomImage />
          </ImageWrapper>
          <TableWrapper>
          </TableWrapper>
        </StatusWrapper>
      </MainWrapper>
    </>
  );
};
