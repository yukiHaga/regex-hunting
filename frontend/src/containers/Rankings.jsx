import React, { Fragment, useEffect, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// Colors
import { COLORS } from '../style_constants.js';

// DescriptionWrapper
import { DescriptionWrapper } from '../components/shared_style.js';

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';


const FakeBlock = styled.div`
  background-color: ${COLORS.SUB};
  height: 56px;
`;

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
`;

const TitleLineWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ButtonWrapper = styled.div`
  font-size: 60px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :focus {
    outline: 0;
  }
`;

const ChangeGraphBoxSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 36px;
  line-height: 54px;
  text-align: center;
`;

const RankingWrapper = styled.div`
 width: 80%;
 margin: 0 auto;
 margin-top: 20px;
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  background-color: ${COLORS.WHITE};
  font-family: YuGothic;
  font-weight: normal;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 8px;
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  width: 80%;
  border: 1px solid rgba(0,0,0,.2);
`;

const RankingTd = styled.td`
  padding: 10px 30px; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 10%;
  font-weight: bold;
`;

const TimeTd = styled.td`
  padding: 10px 30px; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 30%;
  font-weight: bold;
`;

const HunterTd = styled.td`
  padding: 10px 30px; 
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  width: 40%;
  font-weight: bold;
`;

const RankingDataTd = styled.td`
  padding: 10px 30px; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 10%;
`;

const TimeDataTd = styled.td`
  padding: 10px 30px; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 30%;
`;

const HunterDataTd = styled.td`
  padding: 10px 30px; 
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  width: 40%;
`;

const CustomThead = styled.thead`
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
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
      <Header /> 
      <FakeHeader />
      <FakeBlock />
      <MainWrapper>
        <TitleLineWrapper>
          <ButtonWrapper 
          >
            <ArrowLeftIcon
              fontSize='inherit' 
              sx={{ color: `${COLORS.BLACK}` }}
            />
          </ButtonWrapper>
          <ChangeGraphBoxSentenceWrapper>
            初級編
          </ChangeGraphBoxSentenceWrapper>
          <ButtonWrapper
          >
            <ArrowRightIcon
              fontSize='inherit' 
              sx={{ color: `${COLORS.BLACK}` }}
            />
          </ButtonWrapper>
        </TitleLineWrapper>
        <RankingWrapper>
          <CustomTable>
            <CustomThead>
              <tr>
                <RankingTd>順位</RankingTd>
                <TimeTd>クリアタイム</TimeTd>
                <HunterTd>ハンター</HunterTd>
              </tr>
            </CustomThead>
            <tbody>
              <tr>
                <RankingDataTd>1</RankingDataTd>
                <TimeDataTd>00:55</TimeDataTd>
                <HunterDataTd></HunterDataTd>
              </tr>
              <tr>
                <RankingDataTd>2</RankingDataTd>
                <TimeDataTd>01:00</TimeDataTd>
                <HunterDataTd></HunterDataTd>
              </tr>
            </tbody>
          </CustomTable>
        </RankingWrapper>
      </MainWrapper>
    </>
  );
};
