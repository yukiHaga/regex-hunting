import React, {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Presentational Components
import { Header } from "../components/Headers/Header";
import { SessionFlashMessage } from "../components/FlashMessages/SessionFlashMessage";
import { UserStatus } from "../components/MyPages/UserStatus";
import { StudyHeatMap } from "../components/MyPages/StudyHeatMap";
import { DescriptionWrapper } from "../components/shared_style";
import { GameContent } from "../components/GameContents/GameContent";
import { TitleCard } from "../components/MyPages/TitleCard";
import { Footer } from "../components/Footers/Footer";
import { ReleaseConditionDialog } from "../components/Dialogs/ReleaseConditionDialog";
import { CircularMask } from "../components/loads/CircularMask";
import { GameClearCountBox } from "../components/MyPages/GameClearCountBox";
import { TimeAnalysisBox } from "../components/MyPages/TimeAnalysisBox";
import { FastAnalysisBox } from "../components/MyPages/FastAnalysisBox";
import { SecondSelectBox } from "../components/MyPages/SecondSelectBox";
import { TitleFlashMessage } from "../components/FlashMessages/TitleFlashMessage";

// Images
import ElementaryGameContentImage from "../images/elementary_game_content.jpg";
import IntermediateGameContentImage from "../images/intermediate_game_content.jpg";
import AdvancedGameContentImage from "../images/advanced_game_content.jpg";

// Contextオブジェクト
import { UserContext } from "../context/UserProvider";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from "../apis/checkLoginStatus";

// マイページの情報を取得するAPIコール関数
import { getMyPageInfo } from "../apis/mypage";

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from "../constants";

// REQUEST_STATE
import { REQUEST_STATE } from "../constants";

// Colors
import { COLORS } from "../style_constants";

// 今月の月を取得する関数
import { getMonthOfTheMonth } from "../functions/getMonthOfTheMonth";

import { WIDTH } from "../style_constants";

// myPageStateの型
import { MyPageState } from "../types/containers/myPages";

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
  } ;
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
  } ;
`;

// クエスト一覧というセンテンスのラッパー
const QuestSentenceWrapper = styled(DescriptionWrapper)`
  padding-top: 2%;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 1.35em;
  } ;
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
  } ;
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

export const MyPages = (): JSX.Element => {
  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const {
    requestUserState: {
      requestState,
      sessionState,
      userState: { user },
      battleAudioState,
    },
    dispatch,
    requestUserActionTyps,
  } = useContext(UserContext);

  // 今月の月を計算する関数
  const thisMonth = useMemo(() => getMonthOfTheMonth(), []);

  // myPageStateの最初の状態
  // isOpenDialog, name, releaseDate, releaseConditionは
  // タイトルカードのモーダルで使用する
  const initialState: MyPageState = {
    gameFrequenciesPerDay: {},
    fastTimePerDifficulty: {},
    ownedTitles: [],
    selectedTotalTime: 0,
    selectedGameClearCount: 0,
    selectedFastTime: 0,
    difficultyMonthTitle: `初級編(${thisMonth}月)`,
    prevDifficultyMonthTitle: `上級編(${thisMonth}月)`,
    nextDifficultyMonthTitle: `中級編(${thisMonth}月)`,
    isOpenDialog: false,
    name: "",
    releaseDate: "",
    releaseCondition: "",
    display: false,
    message: "",
    getPageInfo: false,
    totalTimePerDifficulty: {
      advanced: 0,
      elementary: 0,
      intermediate: 0,
    },
    gameClearCountPerDifficulty: {
      advanced: 0,
      elementary: 0,
      intermediate: 0,
    },
  };

  // MyPageの状態を管理するstate
  const [myPageState, setMyPageState] = useState(initialState);

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();

  // ブラウザをリロードしてもログイン状態を維持するためのuseEffect
  useEffect(() => {
    if (sessionState === false) {
      dispatch({ type: requestUserActionTyps.REQUEST });
      checkLoginStatus()
        .then((data) => {
          dispatch({
            type: requestUserActionTyps.REQUEST_SUCCESS,
            payload: {
              session: data.session,
              user: data.user,
            },
          });
          if (!data.session && location.key === "default") {
            navigate("/", {
              state: { display: true, success: "ログインしてください。" },
            });
          }
        })
        .catch((e) => {
          if (e.response.status === HTTP_STATUS_CODE.NOT_FOUND) {
            dispatch({
              type: requestUserActionTyps.REQUEST_FAILURE,
              payload: {
                errors: e.response.data.errors,
              },
            });
          } else {
            throw e;
          }
        });
    }
  }, [
    dispatch,
    sessionState,
    requestUserActionTyps.REQUEST,
    requestUserActionTyps.REQUEST_SUCCESS,
    requestUserActionTyps.REQUEST_FAILURE,
    navigate,
    location.key,
  ]);

  // マイページの情報を取得するuseLayoutEffect
  // 初回マウント時とuserが変化したタイミングで実行される
  // user存在時のみ発動するように、if文で制御した
  // 内部で今月のグラフのデータも算出している
  // sessionStateがtrueの時かつ、userがサーバーから取得できたときに実行する
  // getPageInfoのおかげで、マイページのデータを取得したら、
  // このuseLayoutEffectは機能しないように設定されている
  useLayoutEffect(() => {
    if (!myPageState.getPageInfo && sessionState && Object.keys(user).length) {
      getMyPageInfo(user.id as number)
        .then((data) => {
          setMyPageState((prev) => ({
            ...prev,
            gameFrequenciesPerDay: data.game_frequencies_per_day,
            totalTimePerDifficulty: data.total_time_per_difficulty,
            gameClearCountPerDifficulty: data.game_clear_count_per_difficulty,
            fastTimePerDifficulty: data.fast_time_per_difficulty,
            ownedTitles: data.owned_titles,
            selectedTotalTime: data.total_time_per_difficulty.elementary,
            selectedGameClearCount:
              data.game_clear_count_per_difficulty.elementary,
            selectedFastTime: data.fast_time_per_difficulty.elementary,
            getPageInfo: true,
          }));
        })
        .catch((e) => {
          if (e.response.status === HTTP_STATUS_CODE.NOT_FOUND) {
            setMyPageState((prev) => ({
              ...prev,
            }));
          } else {
            throw e;
          }
        });
    }
  }, [user, sessionState, thisMonth, myPageState.getPageInfo]);

  // ゲーム中のユーザーがトップページに戻ったときに
  // 音を消すuseEffect
  useEffect(() => {
    if (battleAudioState.play) {
      battleAudioState.audio.pause();
      battleAudioState.audio.currentTime = 0;
    }
  }, [battleAudioState.play, battleAudioState.audio]);

  return (
    <>
      {requestState === REQUEST_STATE.LOADING ? (
        <CircularMask />
      ) : (
        <>
          <Header />
          <MainWrapper>
            <SessionFlashMessage location={location} />
            <TitleFlashMessage
              display={myPageState.display}
              message={myPageState.message}
              setMyPageState={setMyPageState}
            />
            <MainFirstWrapper>
              <UserStatus
                name={user.name as string}
                rank={user.rank}
                activeTitle={user.active_title}
                temporaryExperience={user.temporary_experience}
                totalExperience={user.total_experience}
                maximumExperiencePerRank={user.maximum_experience_per_rank}
                image={user.image}
              />
              <StudyHeatMapWrapper>
                <StudyHeatMapSentenceWrapper>
                  学習カレンダー
                </StudyHeatMapSentenceWrapper>
                <StudyHeatMap
                  gameFrequenciesPerDay={myPageState.gameFrequenciesPerDay}
                />
              </StudyHeatMapWrapper>
            </MainFirstWrapper>
            <MainSecondWrapper>
              <MainSecondSelectWrapper>
                <SecondSelectBox
                  difficultyMonthTitle={myPageState.difficultyMonthTitle}
                  prevDifficultyMonthTitle={
                    myPageState.prevDifficultyMonthTitle
                  }
                  nextDifficultyMonthTitle={
                    myPageState.nextDifficultyMonthTitle
                  }
                  setMyPageState={setMyPageState}
                  thisMonth={thisMonth}
                />
              </MainSecondSelectWrapper>
              <MainSecondGraphWrapper>
                <TimeAnalysisBox time={myPageState.selectedTotalTime} />
                <GameClearCountBox count={myPageState.selectedGameClearCount} />
                <FastAnalysisBox minutes={myPageState.selectedFastTime} />
              </MainSecondGraphWrapper>
            </MainSecondWrapper>
            <SecondWrapper>
              <QuestSentenceWrapper>クエスト一覧</QuestSentenceWrapper>
              <MyPageGameContentsWrapper>
                <GameContent
                  difficulty="elementary"
                  image={ElementaryGameContentImage}
                />
                <GameContent
                  difficulty="intermediate"
                  image={IntermediateGameContentImage}
                />
                <GameContent
                  difficulty="advanced"
                  image={AdvancedGameContentImage}
                />
              </MyPageGameContentsWrapper>
            </SecondWrapper>
            <ThirdWrapper>
              <TitleListSentenceWrapper>称号一覧</TitleListSentenceWrapper>
              <TitleListWrapper>
                {myPageState.ownedTitles.map((obj, index) => (
                  <Fragment key={index}>
                    <TitleCard
                      name={obj.name}
                      releaseDate={obj.release_date}
                      onClick={() =>
                        setMyPageState((prev) => ({
                          ...prev,
                          isOpenDialog: true,
                          name: obj.name,
                          releaseDate: obj.release_date,
                          releaseCondition: obj.release_condition,
                        }))
                      }
                    />
                  </Fragment>
                ))}
              </TitleListWrapper>
            </ThirdWrapper>
          </MainWrapper>
          <Footer />
          {myPageState.isOpenDialog && (
            <ReleaseConditionDialog
              isOpen={myPageState.isOpenDialog}
              onClose={() =>
                setMyPageState((prev) => ({
                  ...prev,
                  isOpenDialog: false,
                  name: "",
                  releaseDate: "",
                  releaseCondition: "",
                }))
              }
              name={myPageState.name}
              releaseDate={myPageState.releaseDate}
              releaseCondition={myPageState.releaseCondition}
              setMyPageState={setMyPageState}
            />
          )}
        </>
      )}
    </>
  );
};
