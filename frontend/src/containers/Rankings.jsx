import React, { Fragment, useState, useEffect, useLayoutEffect, useContext } from 'react';
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

// ランキングを取得するAPIコール関数
import { getRanking } from '../apis/ranking.js'; 

// クリアタイムを00:00:00のフォーマットで取得する関数
import { getClearTime } from '../functions/getClearTime.js';

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

const NotDescriptionWrapper = styled(DescriptionWrapper)`
`;

const NotRankingWrapper = styled(RankingWrapper)`
 width: 100%;
 height: 475px;
 text-align: center;
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

  const initialState = {
    top_three_elementary: [],
    top_three_intermediate: [],
    top_three_advanced: [],
    current_top_three_array: [],
    difficulty_title: ""
  };

  // ランキングを制御するstate
  const [rankingState, setRankingState] = useState(initialState);

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

  // ランキングデータを取得するためのuseEffect
  useLayoutEffect(() => {
    getRanking().then((data) => {
      setRankingState((prev) => ({
        ...prev,
        top_three_elementary: data.top_three_elementary,
        top_three_intermediate: data.top_three_intermediate,
        top_three_advanced: data.top_three_advanced,
        current_top_three_array: data.top_three_elementary,
        difficulty_title: "初級編"
      }));
    }).catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
        setRankingState((prev) => ({
          ...prev,
        }));
      } else {
        throw e;
      }
    })
  }, [
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
 
  // 初級のデータを表示する関数
  const handleElementary = () => {
    setRankingState((prev) => ({
      ...prev,
      current_top_three_array: prev.top_three_elementary,
      difficulty_title: "初級編"
    }));
  };

  // 中級のデータを表示する関数
  const handleIntermediate = () => {
    setRankingState((prev) => ({
      ...prev,
      current_top_three_array: prev.top_three_intermediate,
      difficulty_title: "中級編"
    }));
  };

  // 上級のデータを表示する関数
  const handleAdvanced = () => {
    setRankingState((prev) => ({
      ...prev,
      current_top_three_array: prev.top_three_advanced,
      difficulty_title: "上級編"
    }));
  };

  // 左矢印のリンクを制御する関数
  // difficulty_titleは初め初級が入る
  // そのため、defaultは上級の関数が実行される
  const handleLeftArrow = (difficulty_title) => {
    switch (difficulty_title){
      case '中級編':
        handleElementary();
        break;
      case '上級編':
        handleIntermediate(); 
        break;
      default:
        handleAdvanced();
    }
  };

  // 右矢印のリンクを制御する関数
  // difficulty_titleは初め初級が入る
  // そのため、defaultは中級の関数が実行される
  const handleRightArrow = (difficulty_title) => {
    switch (difficulty_title){
      case '中級編':
        handleAdvanced();
        break;
      case '上級編':
        handleElementary();
        break;
      default:
        handleIntermediate(); 
    }
  };

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
              onClick={() => handleLeftArrow(rankingState.difficulty_title)}
            />
          </ButtonWrapper>
          <ChangeGraphBoxSentenceWrapper>
            {rankingState.difficulty_title}
          </ChangeGraphBoxSentenceWrapper>
          <ButtonWrapper
          >
            <ArrowRightIcon
              fontSize='inherit' 
              sx={{ color: `${COLORS.BLACK}` }}
              onClick={() => handleRightArrow(rankingState.difficulty_title)}
            />
          </ButtonWrapper>
        </TitleLineWrapper>
        {
          rankingState.current_top_three_array.length ?
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
                    rankingState.current_top_three_array.map(({
                      game_management, 
                      user
                    }, index) => (
                      <tr>
                        <RankingDataTd>{index + 1}</RankingDataTd>
                        <TimeDataTd>
                          {
                            getClearTime(0, game_management.result_time).slice(3)
                          }
                        </TimeDataTd>
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
                                      {user.name}
                                    </HunterTableNameTd>
                                  </tr>
                                  <tr>
                                    <HunterTableMetaTd>
                                      ランク
                                    </HunterTableMetaTd>
                                    <HunterTableTd>
                                      {user.rank}
                                    </HunterTableTd>
                                  </tr>
                                  <tr>
                                    <HunterTableRankMetaTd>
                                      称号
                                    </HunterTableRankMetaTd>
                                    <HunterTableRankDataTd>
                                      {user.active_title}
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
          :
            <NotRankingWrapper>
              <NotDescriptionWrapper>
                ランキングが存在しません
              </NotDescriptionWrapper>
            </NotRankingWrapper>
        }
      </MainWrapper>
      <Footer />
    </>
  );
};
