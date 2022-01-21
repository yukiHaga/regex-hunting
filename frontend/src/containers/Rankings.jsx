import React, { Fragment, useEffect, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';

// MUI
import Avatar from '@mui/material/Avatar';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { Footer } from '../components/Footers/Footer.jsx';

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

// Images
import TemporaryUserImage from '../images/temporary_user_image.png';

const FakeBlock = styled.div`
  background-color: ${COLORS.SUB};
  height: 56px;
`;

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-bottom: 56px;
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

const CustomThead = styled.thead`
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
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
  padding 10px 0;
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 5%;
  font-weight: bold;
`;

const TimeTd = styled.td`
  padding: 10px 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 10%;
  font-weight: bold;
`;

const HunterTd = styled.td`
  padding: 10px 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 65%;
  font-weight: bold;
`;

const RankingDataTd = styled.td`
  padding: 10px 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 10%;
  font-size: 20px;
`;

const TimeDataTd = styled.td`
  padding: 10px 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 30%;
  font-size: 20px;
`;

const HunterDataTd = styled.td`
  padding: 10px 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 40%;
`;

// ステータスのラッパー
const StatusWrapper = styled.div`
  display: flex
`;

const AvatarWrapper = styled.div`
  align-self: center;
`;

// ハンター項目内のテーブル
const HunterTableWrapper = styled.div`
  align-self: center;
  margin: 0 auto;
`;

const HunterTable = styled.table`
  width: 400px;
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-weight: normal;
  font-size: 18px;
  margin: 0 auto;
  border: none;
`;

const HunterTableTd = styled.td`
  padding: 5px 30px; 
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
`;

const HunterTableNameTd = styled(HunterTableTd)`
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  color: ${COLORS.BLACK};
`;

const HunterTableMetaTd = styled(HunterTableTd)`
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  font-weight: bold;
`;

const HunterTableRankMetaTd = styled.td`
  padding: 5px 30px; 
  border: none;
  text-align: left;
  font-weight: bold;
`;

const HunterTableRankDataTd = styled.td`
  padding: 5px 30px; 
  border: none;
  text-align: right;
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
              {
                [1, 2, 3, 4, 5].map((value) => (
                  <tr>
                    <RankingDataTd>{value}</RankingDataTd>
                    <TimeDataTd>00:55</TimeDataTd>
                    <HunterDataTd>
                      <StatusWrapper>
                        <AvatarWrapper>
                          <Avatar
                            alt="Hunter"
                            src={TemporaryUserImage}
                            sx={{ width: 110, height: 110 }}
                          />
                        </AvatarWrapper>
                        <HunterTableWrapper>
                          <HunterTable>
                            <tbody>
                              <tr>
                                <HunterTableNameTd colSpan={2}>
                                  Yuki
                                </HunterTableNameTd>
                              </tr>
                              <tr>
                                <HunterTableMetaTd>
                                  ランク
                                </HunterTableMetaTd>
                                <HunterTableTd>
                                  18
                                </HunterTableTd>
                              </tr>
                              <tr>
                                <HunterTableRankMetaTd>
                                  称号
                                </HunterTableRankMetaTd>
                                <HunterTableRankDataTd>
                                  語り継がれし英雄
                                </HunterTableRankDataTd>
                              </tr>
                            </tbody>
                          </HunterTable>
                        </HunterTableWrapper>
                      </StatusWrapper>
                    </HunterDataTd>
                  </tr>
                ))
              }
            </tbody>
          </CustomTable>
        </RankingWrapper>
      </MainWrapper>
      <Footer />
    </>
  );
};
