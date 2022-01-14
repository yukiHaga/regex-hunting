import React, { Fragment, useContext, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { SessionFlashMessage } from '../components/FlashMessages/SessionFlashMessage.jsx';
import { StatusExperienceBox } from '../components/Games/StatusExperienceBox.jsx'

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
`;

// Mainのfirstラッパー
const MainFirstWrapper = styled.div`
  display: flex;
`;

// ステータスのラッパー
const StatusWrapper = styled.div`
  width: 722px;
  height: 260px;
  border-radius: 3px;
  background-color: ${COLORS.WHITE};
  margin-left: 40px;
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  display: flex
`;

// イメージのラッパー
const ImageWrapper = styled.div`
  width: 220px;
  height: 220px;
  background-color: ${COLORS.WHITE};
  border-radius: 3px;
  align-self: center;
  padding: 16px;
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
  background-color: ${COLORS.WHITE};
  border-radius: 3px;
  align-self: center;
`;

const CustomTable = styled.table`
  width: 450px;
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  background-color: ${COLORS.WHITE};
  font-family: YuGothic;
  font-weight: normal;
  font-size: 18px;
  margin: 0 auto;
  border: none;
`;

const CustomTd = styled.td`
  padding: 10px 40px; 
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
`;

const NameTd = styled(CustomTd)`
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  text-align: left;
  color: ${COLORS.BLACK};
`;

const MetaTd = styled(CustomTd)`
  padding: 10px 40px; 
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  font-weight: bold;
`;

const ExpTd = styled(CustomTd)`
  text-align: left;
  border: none;
`;

export const MyPages = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: { 
      sessionState,
      userState: { user }
    },
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
        <MainFirstWrapper>
          <StatusWrapper>
            <ImageWrapper>
              <CustomImage />
            </ImageWrapper>
            <TableWrapper>
              <CustomTable>
                <tbody>
                  <tr>
                    <NameTd colSpan={2}>{user.name}</NameTd> 
                  </tr>
                  <tr>
                    <MetaTd>ランク</MetaTd> 
                    <CustomTd>{user.rank}</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>称号</MetaTd> 
                    <CustomTd>{user.active_title}</CustomTd>
                  </tr>
                  <tr>
                    <ExpTd colSpan={2}>
                      <StatusExperienceBox 
                        temporary_experience={user.temporary_experience}
                        total_experience={user.total_experience}
                        maximum_experience_per_rank={user.maximum_experience_per_rank}
                      />
                    </ExpTd>
                  </tr>
                </tbody>
              </CustomTable>
            </TableWrapper>
          </StatusWrapper>
        </MainFirstWrapper>
        アイウエオ
      </MainWrapper>
    </>
  );
};
