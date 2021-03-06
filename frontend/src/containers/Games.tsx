import React, { useState, Fragment, useEffect, useLayoutEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Image
import RealBackGroundImage from '../images/temporary_real_background_image.jpg';

// Presentational Components
import { Header } from '../components/Headers/Header';
import { HintBar } from '../components/Games/HintBar';
import { ElementaryMonster } from '../components/Games/ElementaryMonster';
import { IntermediateMonster } from '../components/Games/IntermediateMonster';
import { AdvancedMonster } from '../components/Games/AdvancedMonster';
import { QuestionBlock } from '../components/Games/QuestionBlock';
import { CodeBlock } from '../components/Games/CodeBlock';
import { TimeGage } from '../components/Games/TimeGage';
import { HpGage } from '../components/Games/HpGage';
import { GameFooter } from '../components/Footers/GameFooter';
import { JudgementFlashMessage } from '../components/FlashMessages/JudgementFlashMessage'
import { GameClearDialog } from '../components/Dialogs/GameClearDialog'
import { GameOverDialog } from '../components/Dialogs/GameOverDialog'
import { CheckAnswerDialog } from '../components/Dialogs/CheckAnswerDialog'
import { ElementaryGameDescriptionDialog } from '../components/Dialogs/ElementaryGameDescriptionDialog'
import { IntermediateGameDescriptionDialog } from '../components/Dialogs/IntermediateGameDescriptionDialog'
import { AdvancedGameDescriptionDialog } from '../components/Dialogs/AdvancedGameDescriptionDialog'

import { RankUpDialog } from '../components/Dialogs/RankUpDialog';
import { CheckMetaDialog } from '../components/Dialogs/CheckMetaDialog';
import { CutImage } from '../components/Games/CutImage';
import { ClawImage } from '../components/Games/ClawImage';
import { CircularMask } from '../components/loads/CircularMask';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus';

// ゲームステータス, 問題, モンスターデータを取得する関数
import { getGameStart } from '../apis/gameManagement';

// ゲーム終了時の状態をサーバーへ送る関数
import { postGameFinish } from '../apis/gameManagement';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// モンスター名を取得する関数
import { getMonsterName } from '../functions/getMonsterName';

// ゲームクリア音
import GameClearSound from '../sounds/game_clear_25.mp3';

// ゲームオーバー音
import GameOverSound from '../sounds/game_over_70.mp3';

// REQUEST_STATE
import { REQUEST_STATE } from '../constants';

// gameStateの型
import { GameState } from '../types/containers/games';

import { BottomWrapper } from '../components/shared_style';

// MainContentWrapperコンポーネント
const MainContentWrapper = styled.div`
  position: relative;
  padding-top: 3%;
`;

// 背景画像
// absoluteで親要素を基準にするためには
// 親要素にrelativeを書く
const BackGroundImageCover = styled.img`
  position: absolute;
  width: 100%;
  height: 85vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 0px;
  z-index: -4;
  max-width: 100%;
`;

// 画面を揺らすアニメーション
const ShockAnime = keyframes`
  20% {-webkit-transform: translate(20px);}
  40% {-webkit-transform: translate(-20px);}
  60% {-webkit-transform: translate(10px);}
  80% {-webkit-transform: translate(-10px);}
`;

// MainGameContentWrapperコンポーネント
const MainGameContentWrapper = styled.div<{questionJudgement: "progress" | "correct" | "incorrect"}>`
  animation: ${
    ({ questionJudgement }) => questionJudgement === "incorrect" && ShockAnime
  } 0.5s linear 1;
`;

// GameBlockWrapperコンポーネント
// position: relativeを書くことによって、
const GameBlockWrapper = styled.div`
  width: 100%;
`;

// HintBarWrapperコンポーネント
const HintBarWrapper = styled.div`
  position: fixed;
  z-index: 0;
  left: 1.5%;
`;

// BattleBlockWrapperコンポーネント
// background-color: #F6F6DC;
const BattleBlockWrapper = styled.div`
`;

// MonsterBlockWrapperコンポーネント
// vhはブラウザの画面高を元に決まる数値
// ここに高さを設定しておかないと、モンスターがいない時に
// 高さが0になってレイアウトが一気に崩れる
const MonsterBlockWrapper = styled.div`
  width: 67%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  height: 42.7vh;
  align-items: end;
`;

// QuestionBlockWrapperコンポーネント
const QuestionBlockWrapper = styled.div`
  width: 100%;
  padding-top: 1%;
`;

// CodeBlockWrapperコンポーネント
const CodeBlockWrapper = styled.div`
  padding-top: 1%;
  padding-bottom: 1.5%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

// GageBlockWrapperコンポーネント
const GageBlockWrapper = styled.div`
  width: 100%;
`;

export const Games = (): JSX.Element => {

  // useContext
  const {
    requestUserState: {
      requestState,
      sessionState,
      battleAudioState
    },
    dispatch,
    requestUserActionTyps
  } = useContext(UserContext);

  const { difficulty } = useParams();

  // ゲーム初期状態のstate
  const initialState: GameState = {
    gameManagement: {},
    questions: [],
    userHp: 100,
    userMaxHp: 100,
    userAttack: 20,
    userDefence: 30,
    monsterAttack: 0,
    monsterDefence: 0,
    monsterHp: 100,
    monsterMaxHp: 100,
    correctQuestions: [],
    incorrectQuestions: [],
    sentence: 'ロード中',
    nextSentence: "",
    sentenceNum: 0,
    nextSentenceNum: 0,
    targetSentence: "",
    nextTargetSentence: "",
    sampleAnswer: "",
    hint: "",
    nextHint: "",
    matchArray: [],
    flashDisplay: false,
    flashTitle: "",
    inputRegex: "",
    inputRegexObject: {},
    keyAvailable: false,
    gameResult: "",
    firstAppearance: true,
    questionJudgement: "progress",
    timeActive: false,
    checkAnswer: false,
    gameStartTime: 0,
    gameEndTime: 0,
    gameDescriptionOpen: false,
    hasUser: false,
    rank: 1,
    totalExperience: 0,
    maximumExperiencePerRank: 500,
    temporaryExperience: 0,
    prevTemporaryExperience: 0,
    dialogGageUp: false,
    sendGameData: false,
    rankUp: false,
    activeTitle: "見習いハンター",
    clickDescriptionOpen: false,
    clickMetaOpen: false,
  }

  // ゲーム状態を管理するstate
  const [gameState, setGameState] = useState(initialState);

  // 画像用のオブジェクト
  const inputRefObject = useRef(null);

  // React Routerで画面遷移するとユーザーが保持できない為、
  // useEffectで再度リクエストを出す。
  // 初回レンダリング時および、依存配列の要素のどれかが
  // 変化したらuseEffectが実行される。
  // stateが変化しても、依存配列の要素が変化していないなら、
  // useEffectは実行されない
  // ログインしていたらsessionStateはtrueな為、最初のif文は実行されない。
  // ログインしててリロードするとsessionStateはfalseな為、最初のif文が実行される。
  // サーバー側でcurrent_userが存在しない場合、sessionStateはfalseとなる
  // 2個目のif文はログインの有無に関わらず必ず実行される
  // ログインしていない場合は、user等は{}だが、playがtrueになる
  // 説明モーダルのゲームを始めるボタンを押したら時間を測る
  useLayoutEffect(() => {
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
    if(!Object.keys(gameState.gameManagement).length){
      dispatch({
        type: requestUserActionTyps.REQUEST_SUCCESS,
        payload: {
          session: sessionState ? true : false,
          play: { play: true }
        }
      });
      getGameStart(difficulty).then((data) => {
        setGameState((prev) => ({
          ...prev,
          sentence: `${getMonsterName(difficulty)}が現れた！`,
          nextSentence: data.questions["0"].sentence,
          nextSentenceNum: 1,
          nextTargetSentence: data.questions["0"].target_sentence,
          gameManagement: data.game_management,
          questions: data.questions,
          monsterAttack: data.monster.attack,
          monsterDefence: data.monster.defence,
          monsterHp: data.monster.max_hp,
          monsterMaxHp: data.monster.max_hp,
          sampleAnswer: data.questions["0"].sample_answer,
          nextHint: data.questions["0"].hint,
          gameDescriptionOpen: true,
          hasUser: sessionState ?
            true
          :
            false,
          rank: sessionState ?
            data.user.rank
          :
            prev.rank,
          totalExperience: sessionState ?
            data.user.total_experience
          :
            prev.totalExperience,
          maximumExperiencePerRank: sessionState ?
            data.user.maximum_experience_per_rank
          :
            prev.maximumExperiencePerRank,
          temporaryExperience: sessionState ?
            data.user.temporary_experience
          :
            prev.temporaryExperience,
          prevTemporaryExperience: sessionState ?
            data.user.prev_temporary_experience
          :
            prev.prevTemporaryExperience,
          activeTitle: sessionState ?
            data.user.active_title
          :
            prev.activeTitle
        }));
      }).catch((e) => {
        if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
          setGameState((prev) => ({
            ...prev,
            sentence: ""
          }));
        } else {
          throw e;
        }
      });
    }
  }, [
    dispatch,
    difficulty,
    gameState.gameManagement,
    sessionState,
    requestUserActionTyps.REQUEST,
    requestUserActionTyps.REQUEST_SUCCESS,
    requestUserActionTyps.REQUEST_FAILURE,
  ]);

  // 戦闘bgm
  useEffect(() => {
    if(gameState.gameResult !== "") {
      battleAudioState.audio.loop = gameState.gameResult === "progress" ?
                                      true
                                    :
                                      false;
      if(gameState.gameResult === "progress" && !gameState.gameDescriptionOpen && !gameState.clickMetaOpen) {
        battleAudioState.audio.play();
      } else if (gameState.gameResult === "win" || gameState.gameResult === "lose") {
        battleAudioState.audio.pause();
        battleAudioState.audio.currentTime = 0;
      } else {
        battleAudioState.audio.pause();
      }
    }
  }, [
    gameState.gameResult,
    gameState.gameDescriptionOpen,
    gameState.clickMetaOpen,
    battleAudioState.audio
  ])

  // ゲームクリア時の音
  useEffect(() => {
    if(gameState.gameResult === "win") {
      const audio = new Audio(GameClearSound);
      audio.play();
    }
  }, [
    gameState.gameResult
  ]);

  // ゲームオーバーの音
  useEffect(() => {
    if(gameState.gameResult === "lose") {
      const audio = new Audio(GameOverSound);
      audio.play();
    }
  }, [
    gameState.gameResult
  ]);

  // ゲーム終了時のロジック
  // ログインの有無に関わらず、勝つか負けるとゲームのデータをサーバー側へ送る
  // gameState.sendGameDataがfalse。gameState.gameResultがwinまたはlose時だけ発動
  // そのため、絶対1回しか発動しない
  // result_timeの単位はミリ秒である。
  // ユーザーがログインしていなくても送る。
  // ログインユーザーの場合、contextを更新する
  // ログインユーザーしかsessionStateはtrueにならない為、そこを利用する
  useEffect(() => {
    if(!gameState.sendGameData && (gameState.gameResult === "win" || gameState.gameResult === "lose")){
      const timer = setTimeout(() => {
        postGameFinish({
          game_management: {
            difficulty: difficulty,
            game_result: gameState.gameResult as 'win' | 'lose',
            result_time: gameState.gameEndTime - gameState.gameStartTime
          },
          judgement: {
            correct: gameState.correctQuestions,
            incorrect: gameState.incorrectQuestions
          },
          current_user: {
            rank: gameState.rank,
            total_experience: gameState.totalExperience,
            maximum_experience_per_rank: gameState.maximumExperiencePerRank,
            temporary_experience: gameState.temporaryExperience,
            active_title: gameState.activeTitle
          }
        }).then((data) => {
          if(sessionState) {
            dispatch({
              type: requestUserActionTyps.REQUEST_SUCCESS,
              payload: {
                session: data.session,
                user: {
                  rank: data.user.rank,
                  total_experience: data.user.total_experience,
                  maximum_experience_per_rank: data.user.maximum_experience_per_rank,
                  temporary_experience: data.user.temporary_experience,
                  active_title: data.user.active_title
                },
                play: { play: false }
              }
            });
          }
          setGameState((prev) => ({
            ...prev,
            sendGameData: data.send_game_data,
            dialogGageUp: false,
            hasUser: sessionState ?
              true
            :
              false,
            rank: sessionState ?
              data.user.rank
            :
              prev.rank,
            totalExperience: sessionState ?
              data.user.total_experience
            :
              prev.totalExperience,
            maximumExperiencePerRank: sessionState ?
              data.user.maximum_experience_per_rank
            :
              prev.maximumExperiencePerRank,
            temporaryExperience: sessionState ?
              data.user.temporary_experience
            :
              prev.temporaryExperience,
            prevTemporaryExperience: sessionState ?
              data.user.prev_temporary_experience
            :
              prev.prevTemporaryExperience,
            activeTitle: sessionState ?
              data.user.active_title
            :
              prev.activeTitle,
            rankUp: sessionState?
              data.user.rank_up
            :
              prev.rankUp
          }));
        }).catch((e) => {
          if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
            setGameState((prev) => ({
              ...prev,
              sendGameData: true,
              dialogGageUp: false,
            }));
          } else {
            throw e;
          }
        })
        }, 6900);
      return () => clearTimeout(timer);
    }
  }, [
    difficulty,
    gameState.gameResult,
    gameState.correctQuestions,
    gameState.incorrectQuestions,
    gameState.gameEndTime,
    gameState.gameStartTime,
    gameState.maximumExperiencePerRank,
    gameState.rank,
    gameState.temporaryExperience,
    gameState.totalExperience,
    gameState.sendGameData,
    gameState.activeTitle,
    sessionState,
    requestUserActionTyps.REQUEST_FAILURE,
    requestUserActionTyps.REQUEST_SUCCESS,
    dispatch
  ]);

  // console.log(gameState);

  // 画像がロードされているかを判定するstate
  const [ loadState, setLoadState] = useState(false);

  // 画像がロードされていたら、loadStateをtrueにする関数
  // 最初しか使われない
　const judgementLoadState = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if(e) {
      setLoadState(true);
    }
  };

  return (
    <>
      {
        requestState !== REQUEST_STATE.OK && !gameState.gameDescriptionOpen && !loadState ?
          <CircularMask />
        :
          <>
            <Header />
            <MainContentWrapper>
              {
                gameState.flashDisplay &&
                  <JudgementFlashMessage
                    flashDisplay={gameState.flashDisplay}
                    flashTitle={gameState.flashTitle}
                  />
              }
              <BackGroundImageCover src={RealBackGroundImage} ref={inputRefObject} onLoad={(e) => judgementLoadState(e)}/>
              <MainGameContentWrapper
                questionJudgement={gameState.questionJudgement}
              >
                <GameBlockWrapper>
                  <HintBarWrapper>
                    <HintBar
                      hint={gameState.hint}
                    />
                  </HintBarWrapper>
                  <BattleBlockWrapper>
                    <MonsterBlockWrapper>
                      {
                        difficulty === 'elementary' &&
                          <>
                            <ElementaryMonster
                              monsterHp={gameState.monsterHp}
                              monsterMaxHp={gameState.monsterMaxHp}
                              questionJudgement={gameState.questionJudgement}
                              firstAppearance={gameState.firstAppearance}
                              gameResult={gameState.gameResult}
                              gameDescriptionOpen={gameState.gameDescriptionOpen}
                            />
                            <ElementaryMonster
                              monsterHp={gameState.monsterHp}
                              monsterMaxHp={gameState.monsterMaxHp}
                              questionJudgement={gameState.questionJudgement}
                              firstAppearance={gameState.firstAppearance}
                              gameResult={gameState.gameResult}
                              gameDescriptionOpen={gameState.gameDescriptionOpen}
                            />
                            <ElementaryMonster
                              monsterHp={gameState.monsterHp}
                              monsterMaxHp={gameState.monsterMaxHp}
                              questionJudgement={gameState.questionJudgement}
                              firstAppearance={gameState.firstAppearance}
                              gameResult={gameState.gameResult}
                              gameDescriptionOpen={gameState.gameDescriptionOpen}
                            />
                          </>
                      }
                      {
                        difficulty === 'intermediate' &&
                          <>
                            <IntermediateMonster
                              monsterHp={gameState.monsterHp}
                              monsterMaxHp={gameState.monsterMaxHp}
                              questionJudgement={gameState.questionJudgement}
                              firstAppearance={gameState.firstAppearance}
                              gameResult={gameState.gameResult}
                              gameDescriptionOpen={gameState.gameDescriptionOpen}
                            />
                          </>
                      }
                      {
                        difficulty === 'advanced' &&
                          <>
                            <AdvancedMonster
                              monsterHp={gameState.monsterHp}
                              monsterMaxHp={gameState.monsterMaxHp}
                              questionJudgement={gameState.questionJudgement}
                              firstAppearance={gameState.firstAppearance}
                              gameResult={gameState.gameResult}
                              gameDescriptionOpen={gameState.gameDescriptionOpen}
                            />
                          </>
                      }
                    </MonsterBlockWrapper>
                    <QuestionBlockWrapper>
                      <QuestionBlock
                        difficulty={difficulty}
                        sentence={gameState.sentence}
                        nextSentence={gameState.nextSentence}
                        sentenceNum={gameState.sentenceNum}
                        nextSentenceNum={gameState.nextSentenceNum}
                        targetSentence={gameState.targetSentence}
                        nextTargetSentence={gameState.nextTargetSentence}
                        nextHint={gameState.nextHint}
                        questionJudgement={gameState.questionJudgement}
                        setGameState={setGameState}
                        inputRegex={gameState.inputRegex}
                        inputRegexObject={gameState.inputRegexObject}
                        correctQuestions={gameState.correctQuestions}
                        incorrectQuestions={gameState.incorrectQuestions}
                        gameDescriptionOpen={gameState.gameDescriptionOpen}
                        gameResult={gameState.gameResult}
                        hasUser={gameState.hasUser}
                        rank={gameState.rank}
                        totalExperience={gameState.totalExperience}
                        maximumExperiencePerRank={gameState.maximumExperiencePerRank}
                        temporaryExperience={gameState.temporaryExperience}
                        clickMetaOpen={gameState.clickMetaOpen}
                      />
                    </QuestionBlockWrapper>
                  </BattleBlockWrapper>
                </GameBlockWrapper>
                <CodeBlockWrapper>
                  <CodeBlock
                    correctQuestions={gameState.correctQuestions}
                    questions={gameState.questions}
                    setGameState={setGameState}
                    targetSentence={gameState.targetSentence}
                    sampleAnswer={gameState.sampleAnswer}
                    monsterHp={gameState.monsterHp}
                    monsterDefence={gameState.monsterDefence}
                    questionJudgement={gameState.questionJudgement}
                    keyAvailable={gameState.keyAvailable}
                    userAttack={gameState.userAttack}
                    sentenceNum={gameState.sentenceNum}
                    gameDescriptionOpen={gameState.gameDescriptionOpen}
                    clickMetaOpen={gameState.clickMetaOpen}
                  />
                </CodeBlockWrapper>
              </MainGameContentWrapper>
            </MainContentWrapper>
            <BottomWrapper>
              <GageBlockWrapper>
                <TimeGage
                  gameState={gameState}
                  setGameState={setGameState}
                  timeActive={gameState.timeActive}
                  monsterAttack={gameState.monsterAttack}
                  userDefence={gameState.userDefence}
                  userHp={gameState.userHp}
                  sentenceNum={gameState.sentenceNum}
                  clickDescriptionOpen={gameState.clickDescriptionOpen}
                  clickMetaOpen={gameState.clickMetaOpen}
                />
                <HpGage
                  userHp={gameState.userHp}
                  userMaxHp={gameState.userMaxHp}
                />
              </GageBlockWrapper>
              <GameFooter
                setGameState={setGameState}
              />
            </BottomWrapper>
            {
              gameState.gameDescriptionOpen && difficulty === 'elementary' &&
                <ElementaryGameDescriptionDialog
                  isOpen={gameState.gameDescriptionOpen}
                  setGameState={setGameState}
                  gameDescriptionOpen={gameState.gameDescriptionOpen}
                  clickDescriptionOpen={gameState.clickDescriptionOpen}
                  hasUser={gameState.hasUser}
                />
            }
            {
              gameState.gameDescriptionOpen && difficulty === 'intermediate' &&
                <IntermediateGameDescriptionDialog
                  isOpen={gameState.gameDescriptionOpen}
                  setGameState={setGameState}
                  gameDescriptionOpen={gameState.gameDescriptionOpen}
                  clickDescriptionOpen={gameState.clickDescriptionOpen}
                  hasUser={gameState.hasUser}
                />
            }
            {
              gameState.gameDescriptionOpen && difficulty === 'advanced' &&
                <AdvancedGameDescriptionDialog
                  isOpen={gameState.gameDescriptionOpen}
                  setGameState={setGameState}
                  gameDescriptionOpen={gameState.gameDescriptionOpen}
                  clickDescriptionOpen={gameState.clickDescriptionOpen}
                  hasUser={gameState.hasUser}
                />
            }
            {
              gameState.gameResult === "win" && !gameState.rankUp && !gameState.checkAnswer &&
                <GameClearDialog
                  isOpen={gameState.gameResult === "win"}
                  difficulty={difficulty}
                  correctQuestions={gameState.correctQuestions}
                  incorrectQuestions={gameState.incorrectQuestions}
                  setGameState={setGameState}
                  getGameStart={getGameStart}
                  initialState={initialState}
                  gameStartTime={gameState.gameStartTime}
                  gameEndTime={gameState.gameEndTime}
                  hasUser={gameState.hasUser}
                  rank={gameState.rank}
                  totalExperience={gameState.totalExperience}
                  maximumExperiencePerRank={gameState.maximumExperiencePerRank}
                  temporaryExperience={gameState.temporaryExperience}
                  prevTemporaryExperience={gameState.prevTemporaryExperience}
                  dialogGageUp={gameState.dialogGageUp}
                  gameResult={gameState.gameResult}
                  rankUp={gameState.rankUp}
                />
            }
            {
              gameState.gameResult === "lose" && !gameState.checkAnswer &&
                <GameOverDialog
                  isOpen={gameState.gameResult === "lose"}
                  difficulty={difficulty}
                  correctQuestions={gameState.correctQuestions}
                  incorrectQuestions={gameState.incorrectQuestions}
                  setGameState={setGameState}
                  getGameStart={getGameStart}
                  initialState={initialState}
                  hasUser={gameState.hasUser}
                  rank={gameState.rank}
                  totalExperience={gameState.totalExperience}
                  maximumExperiencePerRank={gameState.maximumExperiencePerRank}
                  temporaryExperience={gameState.temporaryExperience}
                  prevTemporaryExperience={gameState.prevTemporaryExperience}
                  dialogGageUp={gameState.dialogGageUp}
                  gameResult={gameState.gameResult}
                  rankUp={gameState.rankUp}
                />
            }
            {
              gameState.checkAnswer &&
                <CheckAnswerDialog
                  isOpen={gameState.checkAnswer}
                  difficulty={difficulty}
                  correctQuestions={gameState.correctQuestions}
                  incorrectQuestions={gameState.incorrectQuestions}
                  setGameState={setGameState}
                />
            }
            {
              gameState.rankUp &&
                <RankUpDialog
                  isOpen={gameState.rankUp}
                  rank={gameState.rank}
                  activeTitle={gameState.activeTitle}
                  setGameState={setGameState}
                  difficulty={difficulty}
                  gameResult={gameState.gameResult}
                  rankUp={gameState.rankUp}
                  hasUser={gameState.hasUser}
                />
            }
            {
              gameState.clickMetaOpen &&
                <CheckMetaDialog
                  isOpen={gameState.clickMetaOpen}
                  setGameState={setGameState}
                />
            }
            {
              gameState.gameResult === "progress" && gameState.questionJudgement === "correct" &&
                <CutImage />
            }
            {
              gameState.gameResult === "progress" && gameState.questionJudgement === "incorrect" &&
                <ClawImage />
            }
          </>
      }
    </>
  );
};
