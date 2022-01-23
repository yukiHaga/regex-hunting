import React, { Fragment, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { SessionFlashMessage } from '../components/FlashMessages/SessionFlashMessage.jsx';
import { UserStatus } from '../components/Games/UserStatus.jsx';
import { StudyHeatMap } from '../components/Games/StudyHeatMap.jsx';
import { CorrectPercentGraph } from '../components/Games/CorrectPercentGraph.jsx';
import { ChangeGraphBox } from '../components/Games/ChangeGraphBox.jsx';
import { DescriptionWrapper } from '../components/shared_style.js';
import { GameContent } from '../components/GameContents/GameContent.jsx';
import { TitleCard } from '../components/Games/TitleCard.jsx';
import { Footer } from '../components/Footers/Footer.jsx';
import { ReleaseConditionDialog } from '../components/Dialogs/ReleaseConditionDialog.jsx'
 
// Images
import ElementaryGameContentImage from '../images/elementary_game_content.png';
import IntermediateGameContentImage from '../images/intermediate_game_content.png';
import DefaultAvatarImage from '../images/default_avatar.png';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// マイページの情報を取得するAPIコール関数
import { getMyPageInfo } from '../apis/mypage.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// Colors
import { COLORS } from '../style_constants.js';

// グラフのx座標とy座標を生成する関数 
import { makeCorrectPercentGraphData } from '../functions/makeCorrectPercentGraphData.js'

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
  justify-content: space-evenly;
`;

// Mainのsecondラッパー
const MainSecondWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 40px;
`;

// セカンドラッパー
const SecondWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-top: 80px;
`;

// サードラッパー
const ThirdWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-top: 80px;
  padding-bottom: 40px;
`;

const StudyHeatMapWrapper = styled.div`
  width: 400px;
  background-color: ${COLORS.SUB};
`;

const CorrectPercentGraphWrapper = styled.div`
  background-color: ${COLORS.WHITE};
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
`;

const ChangeGraphBoxWrapper = styled.div`
  width: 400px;
  border-radius: 3px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
`;

// クエスト一覧というセンテンスのラッパー
const QuestSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 24px;
  line-height: 40px;
  display: inline-block;
  text-align: left;
  padding: 0 110px;
`;

// マイページのゲームコンテンツのラッパー
const MyPageGameContentsWrapper = styled.div`
  padding-top: 20px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
`;

// 称号一覧というセンテンスのラッパー
const TitleListSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 24px;
  line-height: 40px;
  display: inline-block;
  text-align: left;
  padding: 0 110px;
`;

// 称号一覧のカードを包括しているラッパー
const TitleListWrapper = styled.div`
  padding-top: 5px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const MyPages = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: { 
      sessionState,
      userState: { user },
      battleAudioState
    },
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // myPageStateの最初の状態
  // isOpenDialog, title_name, release_dateは
  // タイトルカードのモーダルで使う
  const initialState = {
    game_frequencies_per_day: [],
    elementary_correct_percents: [],
    intermediate_correct_percents: [],
    advanced_correct_percents: [],
    owned_titles: [],
    ele_fastest_time: 0,
    int_fastest_time: 0,
    adv_fastest_time: 0,
    elementary_graph_data: {},
    intermediate_graph_data: {},
    advanced_graph_data: {},
    real_graph_data: {},
    difficulty_title: "",
    isOpenDialog: false,
    name: "",
    release_date: "",
    release_condition: ""
  };

  // MyPageの状態を管理するstate
  const [myPageState, setMyPageState] = useState(initialState);

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

  // マイページの情報を取得するuseLayoutEffect
  // 初回マウント時とuserが変化したタイミングで実行される
  // user存在時のみ発動するように、if文で制御した
  // 内部で今月のグラフのデータも算出している
  useLayoutEffect(() => {
    if(Object.keys(user).length){
      getMyPageInfo(user).then((data) => {
        const elementary_graph_data = makeCorrectPercentGraphData(
          data.elementary_correct_percents,
        );
        const intermediate_graph_data = makeCorrectPercentGraphData(
          data.intermediate_correct_percents,
        );
        const advanced_graph_data = makeCorrectPercentGraphData(
          data.advanced_correct_percents,
        )
        setMyPageState((prev) => ({
          ...prev,
          game_frequencies_per_day: data.game_frequencies_per_day,
          elementary_correct_percents: data.elementary_correct_percents,
          intermediate_correct_percents: data.intermediate_correct_percents,
          advanced_correct_percents: data.advanced_correct_percents,
          owned_titles: data.owned_titles,
          ele_fastest_time: data.ele_fastest_time,
          int_fastest_time: data.int_fastest_time,
          adv_fastest_time: data.adv_fastest_time,
          elementary_graph_data: elementary_graph_data,
          intermediate_graph_data: intermediate_graph_data,
          advanced_graph_data: advanced_graph_data,
          real_graph_data: elementary_graph_data,
          difficulty_title: "初級編"
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

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();
  
  console.log(myPageState)

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
          <UserStatus
            name={user.name}
            rank={user.rank}
            active_title={user.active_title}
            temporary_experience={user.temporary_experience}
            total_experience={user.total_experience}
            maximum_experience_per_rank={user.maximum_experience_per_rank}
            image={DefaultAvatarImage}
          />
          <StudyHeatMapWrapper>
            <StudyHeatMap 
              game_frequencies_per_day={myPageState.game_frequencies_per_day}
            />
          </StudyHeatMapWrapper>
        </MainFirstWrapper>
        <MainSecondWrapper>
          <CorrectPercentGraphWrapper>
            <CorrectPercentGraph 
              real_graph_data={
                myPageState.real_graph_data
              }
              difficulty_title={
                myPageState.difficulty_title
              }
            />
          </CorrectPercentGraphWrapper>
          <ChangeGraphBoxWrapper>
            <ChangeGraphBox 
              ele_fastest_time={myPageState.ele_fastest_time}
              int_fastest_time={myPageState.int_fastest_time}
              adv_fastest_time={myPageState.adv_fastest_time}
              elementary_correct_percents={
                myPageState.elementary_correct_percents
              }
              intermediate_correct_percents={
                myPageState.intermediate_correct_percents
              }
              advanced_correct_percents={
                myPageState.advanced_correct_percents
              }
              setMyPageState={setMyPageState}
            />
          </ChangeGraphBoxWrapper>
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
  );
};
