import React, { Fragment, useContext, useEffect, useLayoutEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { SessionFlashMessage } from '../components/FlashMessages/SessionFlashMessage.jsx';
import { UserStatus } from '../components/Games/UserStatus.jsx';
import { StudyHeatMap } from '../components/Games/StudyHeatMap.jsx';
import { DescriptionWrapper } from '../components/shared_style.js';
import { GameContent } from '../components/GameContents/GameContent.jsx';
import { TitleCard } from '../components/Games/TitleCard.jsx';
import { Footer } from '../components/Footers/Footer.jsx';
import { ReleaseConditionDialog } from '../components/Dialogs/ReleaseConditionDialog.jsx'
import { CircularMask } from '../components/loads/CircularMask.jsx';
import { GameClearCountBox } from '../components/Games/GameClearCountBox.jsx';
import { TimeAnalysisBox } from '../components/Games/TimeAnalysisBox.jsx';
import { FastAnalysisBox } from '../components/Games/FastAnalysisBox.jsx';
import { SecondSelectBox } from '../components/Games/SecondSelectBox.jsx';
import { TitleFlashMessage } from '../components/FlashMessages/TitleFlashMessage.jsx';
 
// Images
import ElementaryGameContentImage from '../images/elementary_game_content.jpg';
import IntermediateGameContentImage from '../images/intermediate_game_content.png';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// マイページの情報を取得するAPIコール関数
import { getMyPageInfo } from '../apis/mypage.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// REQUEST_STATE
import { REQUEST_STATE } from '../constants';

// Colors
import { COLORS } from '../style_constants.js';

// 今月の月を取得する関数
import { getMonthOfTheMonth } from '../functions/getMonthOfTheMonth.js';

import { WIDTH } from '../style_constants.js';

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  text-align: center;
  padding-top: 4.3%;
  position: relative;
`;

// Mainのfirstラッパー
const MainFirstWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 85%;
  margin: 0 auto;
`;

// Mainのsecondラッパー
const MainSecondWrapper = styled.div`
  padding-bottom: 0.5%;
  margin-top: 1.5%;
  margin-bottom: 1%;
  width: 85%;
  margin: 0 auto;
`;

// 難易度を変化させるラッパー
const MainSecondSelectWrapper = styled.div`
  width: 100%;
  padding-top: 3.3%;
  font-weight: bold;
  margin: 0 auto;
`;

// Mainのsecondのグラフラッパー
const MainSecondGraphWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 1.8%;
  width: 100%;
  margin: 0 auto;
  margin-top: 2%;
  margin-bottom: 2%;
  border-radius: 3px;
`;

// セカンドラッパー
const SecondWrapper = styled.div`
  background-color: ${COLORS.SUB};
  width: 86%;
  margin: 0 auto;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    width: 92%;
  };
`;

// サードラッパー
const ThirdWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-top: 3.5%;
  padding-bottom: 2%;
  width: 98%;
  margin: 0 auto;
`;

const StudyHeatMapWrapper = styled.div`
  width: 28%;
  background-color: ${COLORS.SUB};
`;

// 学習カレンダーというセンテンスのラッパー
const StudyHeatMapSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 1.5em;
  text-align: left;
  padding-left: 12.5%;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 1.3em;
  };
`;

// クエスト一覧というセンテンスのラッパー
const QuestSentenceWrapper = styled(DescriptionWrapper)`
  padding-top: 2%;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 1.35em;
  };
`;

// マイページのゲームコンテンツのラッパー
const MyPageGameContentsWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  frex-direction: row;
  flex-wrap: wrap;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    justify-content: center;
  };
`;

// 称号一覧というセンテンスのラッパー
const TitleListSentenceWrapper = styled(DescriptionWrapper)`
  padding-top: 1%;
  font-weight: bold;
  font-size: 1.5em;
  display: inline-block;
  text-align: left;
`;

// 称号一覧のカードを包括しているラッパー
const TitleListWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-bottom: 3%;
  width: 88%;
  margin: 0 auto;
`;

export const MyPages = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: { 
      requestState,
      sessionState,
      userState: { user },
      battleAudioState
    },
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // 今月の月を計算する関数
  const this_month = useMemo(() => getMonthOfTheMonth(), []);

  // myPageStateの最初の状態
  // isOpenDialog, name, release_date, release_conditionは
  // タイトルカードのモーダルで使う
  const initialState = {
    game_frequencies_per_day: {},
    total_time_per_difficulty: {},
    game_clear_count_per_difficulty: {},
    fast_time_per_difficulty: {},
    owned_titles: [],
    selected_total_time: 0,
    selected_game_clear_count: 0,
    selected_fast_time: 0,
    difficulty_month_title: "",
    isOpenDialog: false,
    name: "",
    release_date: "",
    release_condition: "",
    display: false,
    message: "",
    get_page_info: false
  };

  // MyPageの状態を管理するstate
  const [myPageState, setMyPageState] = useState(initialState);

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();

  // ブラウザをリロードしてもログイン状態を維持するためのuseEffect
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
        if(!data.session && location.key === 'default') {
          navigate(
            '/', 
            { state: { display: true, success: "ログインしてください。"}}
          )
        }
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
    requestUserActionTyps.REQUEST_FAILURE,
    navigate,
    location.key
  ]);

  // マイページの情報を取得するuseLayoutEffect
  // 初回マウント時とuserが変化したタイミングで実行される
  // user存在時のみ発動するように、if文で制御した
  // 内部で今月のグラフのデータも算出している
  // sessionStateがtrueの時かつ、userがサーバーから取得できたときに実行する
  // get_page_infoのおかげで、マイページのデータを取得したら、
  // このuseLayoutEffectは機能しないように設定されている
  useLayoutEffect(() => {
    if(!myPageState.get_page_info && sessionState && Object.keys(user).length){
      getMyPageInfo(user).then((data) => {
        setMyPageState((prev) => ({
          ...prev,
          game_frequencies_per_day: data.game_frequencies_per_day,
          total_time_per_difficulty: data.total_time_per_difficulty,
          game_clear_count_per_difficulty: data.game_clear_count_per_difficulty,
          fast_time_per_difficulty: data.fast_time_per_difficulty,
          owned_titles: data.owned_titles,
          selected_total_time: data.total_time_per_difficulty.elementary,
          selected_game_clear_count: data.game_clear_count_per_difficulty.elementary,
          selected_fast_time: data.fast_time_per_difficulty.elementary,
          difficulty_month_title: `初級編(${this_month}月)`,
          get_page_info: true
        })); 
      }).catch((e) => {
        if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
          setMyPageState((prev) => ({
            ...prev,
          })); 
        } else {
          throw e;
        }
      });
    }
  }, [
    user,
    sessionState,
    this_month,
    myPageState.get_page_info
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
      {
        requestState === REQUEST_STATE.LOADING ?
          <CircularMask /> 
        :
          <>
            <Header /> 
            <MainWrapper>
              <SessionFlashMessage
                location={location}
              />
              <TitleFlashMessage
                display={myPageState.display}
                message={myPageState.message}
                setMyPageState={setMyPageState}
              />
              <MainFirstWrapper>
                <UserStatus
                  name={user.name}
                  rank={user.rank}
                  active_title={user.active_title}
                  temporary_experience={user.temporary_experience}
                  total_experience={user.total_experience}
                  maximum_experience_per_rank={user.maximum_experience_per_rank}
                  image={user.image}
                />
                <StudyHeatMapWrapper>
                  <StudyHeatMapSentenceWrapper>
                    学習カレンダー
                  </StudyHeatMapSentenceWrapper>
                  <StudyHeatMap 
                    game_frequencies_per_day={myPageState.game_frequencies_per_day}
                  />
                </StudyHeatMapWrapper>
              </MainFirstWrapper>
              <MainSecondWrapper>
                <MainSecondSelectWrapper>
                  <SecondSelectBox 
                    difficulty_month_title={myPageState.difficulty_month_title}
                    setMyPageState={setMyPageState}
                    this_month={this_month}
                  />
                </MainSecondSelectWrapper>
                <MainSecondGraphWrapper>
                  <TimeAnalysisBox
                    time={myPageState.selected_total_time} 
                  />
                  <GameClearCountBox
                    count={myPageState.selected_game_clear_count} 
                  />
                  <FastAnalysisBox
                    minutes={myPageState.selected_fast_time} 
                  />
                </MainSecondGraphWrapper>
              </MainSecondWrapper>
              <SecondWrapper>
                <QuestSentenceWrapper>
                  クエスト一覧
                </QuestSentenceWrapper>
                <MyPageGameContentsWrapper> 
                  <GameContent 
                    difficulty='elementary' 
                    image={ElementaryGameContentImage} 
                  />
                  <GameContent 
                    difficulty='intermediate' 
                    image={IntermediateGameContentImage} 
                  />
                  <GameContent 
                    difficulty='advanced' 
                    image={IntermediateGameContentImage} 
                  />
                </MyPageGameContentsWrapper>
              </SecondWrapper>
              <ThirdWrapper>
                <TitleListSentenceWrapper>
                  称号一覧
                </TitleListSentenceWrapper>
                <TitleListWrapper>
                  {
                    myPageState.owned_titles.map((obj) => (
                      <TitleCard
                        name={obj.name}
                        release_date={obj.release_date}
                        onClick={() => setMyPageState((prev) => ({
                          ...prev,
                          isOpenDialog: true,   
                          name: obj.name,
                          release_date: obj.release_date,
                          release_condition: obj.release_condition
                        }))}
                      />
                    ))
                  }
                </TitleListWrapper>
              </ThirdWrapper>
            </MainWrapper>
            <Footer />
            {
              myPageState.isOpenDialog &&
                <ReleaseConditionDialog 
                  isOpen={myPageState.isOpenDialog}
                  onClose={() => setMyPageState((prev) => ({
                    ...prev,
                    isOpenDialog: false,
                    name: "",
                    release_date: "",
                    release_condition: ""
                  }))}
                  name={myPageState.name}
                  release_date={myPageState.release_date}
                  release_condition={myPageState.release_condition}
                  setMyPageState={setMyPageState}
                />
            }
          </>
      }
    </>
  );
};
