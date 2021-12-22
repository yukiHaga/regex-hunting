import React, { Fragment, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Image
import BackGroundImage from '../images/background.png';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { MetaMenuBar } from '../components/Games/MetaMenuBar.jsx';
import { ElementaryMonster } from '../components/Games/ElementaryMonster.jsx';
import { Footer } from '../components/Footer.jsx';
import { QuestionBlock } from '../components/Games/QuestionBlock.jsx';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// MainContentWrapperコンポーネント
const MainContentWrapper = styled.div`
  padding-top: 36px;
`;

// 背景画像
const BackGroundImageCover = styled.img`
  width: 1790px;
  height: 734px;
  position: absolute;
  top: 55px;
  left: -350px;
  z-index: -4;
`;

// MainGameContentWrapperコンポーネント
const MainGameContentWrapper = styled.div`
`;

// GameBlockWrapperコンポーネント
const GameBlockWrapper = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 30px;
`;

// SlideWrapperコンポーネント
const SlideWrapper = styled.div`
`;

// BattleBlockWrapperコンポーネント
// background-color: #F6F6DC;  
const BattleBlockWrapper = styled.div`
  height: 498px;
  width: 920px;
  margin-left: 5px;
`;

// MonsterBlockWrapperコンポーネント
const MonsterBlockWrapper = styled.div`
  height: 370px;
  width: 900px;
  margin-left: 40px;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: end;
`;

// QuestionBlockWrapperコンポーネント
const QuestionBlockWrapper = styled.div`
  height: 104px;
  width: 860px;
  margin: 0 auto;
  margin-top: 13px;
`;

// CodeBlockWrapperコンポーネント
const CodeBlockWrapper = styled.div`
  height: 70px;
  width: 100%;
  background-color: #666666;
  margin-top: 13px;
`;

// GageBlockWrapperコンポーネント
const GageBlockWrapper = styled.div`
  height: 50px;
  width: 100%;
  background-color: #F6F6DC;
  margin-top: 13px;
`;

export const Games = () => {

  // useContext
  const {
    requestUserState: { sessionState }, 
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  const { difficulty } = useParams();

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
      <MainContentWrapper>
        <BackGroundImageCover src={BackGroundImage} />
        <MainGameContentWrapper>
          <GameBlockWrapper>
            <SlideWrapper>
              <MetaMenuBar />
            </SlideWrapper>
            <BattleBlockWrapper>
              <MonsterBlockWrapper>
                {
                  difficulty === 'elementary' && 
                    <>
                      <ElementaryMonster />
                      <ElementaryMonster />
                      <ElementaryMonster />
                    </>
                }
              </MonsterBlockWrapper>
              <QuestionBlockWrapper>
                <QuestionBlock />
              </QuestionBlockWrapper>
            </BattleBlockWrapper>
          </GameBlockWrapper>
          <CodeBlockWrapper>
          </CodeBlockWrapper>
          <GageBlockWrapper>
          </GageBlockWrapper>
        </MainGameContentWrapper>
      </MainContentWrapper>
      <Footer />
    </>
  );
};
