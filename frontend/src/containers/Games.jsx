import React, { useState, Fragment, useEffect, useLayoutEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Image
import RealBackGroundImage from '../images/temporary_real_background_image.png';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { HintBar } from '../components/Games/HintBar.jsx';
import { ElementaryMonster } from '../components/Games/ElementaryMonster.jsx';
import { IntermediateMonster } from '../components/Games/IntermediateMonster.jsx';
import { AdvancedMonster } from '../components/Games/AdvancedMonster.jsx';
import { QuestionBlock } from '../components/Games/QuestionBlock.jsx';
import { CodeBlock } from '../components/Games/CodeBlock.jsx';
import { TimeGage } from '../components/Games/TimeGage.jsx';
import { HpGage } from '../components/Games/HpGage.jsx';
import { GameFooter } from '../components/Footers/GameFooter.jsx';
import { JudgementFlashMessage } from '../components/FlashMessages/JudgementFlashMessage.jsx'
import { GameClearDialog } from '../components/Dialogs/GameClearDialog.jsx'
import { GameOverDialog } from '../components/Dialogs/GameOverDialog.jsx'
import { CheckAnswerDialog } from '../components/Dialogs/CheckAnswerDialog.jsx'
import { ElementaryGameDescriptionDialog } from '../components/Dialogs/ElementaryGameDescriptionDialog.jsx'
import { RankUpDialog } from '../components/Dialogs/RankUpDialog.jsx';
import { CheckMetaDialog } from '../components/Dialogs/CheckMetaDialog.jsx';
import { CutImage } from '../components/Games/CutImage.jsx';
import { ClawImage } from '../components/Games/ClawImage.jsx';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// ゲームステータス, 問題, モンスターデータを取得する関数 
import { getGameStart } from '../apis/gameManagement.js'; 

// ゲーム終了時の状態をサーバーへ送る関数 
import { postGameFinish } from '../apis/gameManagement.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// モンスター名を取得する関数
import { getMonsterName } from '../functions/getMonsterName.js';

// ゲームクリア音
import GameClearSound from '../sounds/game_clear_50.wav';

// ゲームオーバー音
import GameOverSound from '../sounds/game_over.mp3';

// MainContentWrapperコンポーネント
const MainContentWrapper = styled.div`
  padding-top: 36px;
`;

// 背景画像
const BackGroundImageCover = styled.img`
  width: 1440px;
  height: 734px;
  position: absolute;
  top: 55px;
  left: 0px;
  z-index: -4;
`;

// 画面を揺らすアニメーション
const ShockAnime = keyframes`
  20% {-webkit-transform: translate(20px);}
  40% {-webkit-transform: translate(-20px);}
  60% {-webkit-transform: translate(10px);}
  80% {-webkit-transform: translate(-10px);}
`;

// MainGameContentWrapperコンポーネント
const MainGameContentWrapper = styled.div`
  animation: ${
    (props) => props.question_judgement === "incorrect" && ShockAnime
  } 0.5s linear 1;
`;

// GameBlockWrapperコンポーネント
const GameBlockWrapper = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 24px;
`;

// SlideWrapperコンポーネント
const SlideWrapper = styled.div`
`;

// BattleBlockWrapperコンポーネント
// background-color: #F6F6DC;  
const BattleBlockWrapper = styled.div`
  height: 498px;
  width: 920px;
`;

// MonsterBlockWrapperコンポーネント
const MonsterBlockWrapper = styled.div`
  height: 370px;
  width: 900px;
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
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
`;

// CodeBlockWrapperコンポーネント
const CodeBlockWrapper = styled.div`
  height: 53px;
  margin-top: 13px;
`;

// GageBlockWrapperコンポーネント
const GageBlockWrapper = styled.div`
  height: 66px;
  width: 100%;
  margin-top: 13px;
`;

// Judgementメッセージを出すためのコンポーネント
const CustomJudgementFlashMessage = styled(JudgementFlashMessage)`
  position: relative;
  z-index: 1;
`;

export const Games = () => {

  // useContext
  const {
    requestUserState: { sessionState, battleAudioState }, 
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  const { difficulty } = useParams();

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();

  // ゲーム初期状態のstate
  const initialState = {
    game_management: {},
    questions: [],
    user_hp: 100,
    user_max_hp: 100,
    user_attack: 20,
    user_defence: 30,
    monster_attack: {},
    monster_defence: {},
    monster_hp: 100,
    monster_max_hp: 100,
    correct_questions: [],
    incorrect_questions: [],
    sentence: `${getMonsterName(difficulty)}が現れた！`,
    next_sentence: "",
    sentence_num: 0,
    next_sentence_num: 0,
    target_sentence: "",
    next_target_sentence: "",
    sample_answer: [],
    hint: "",
    next_hint: "",
    match_array: [],
    commentary: "",
    next_commentary: "",
    flash_display: false,
    flash_title: "",
    input_regex_object: {},
    key_available: false,
    game_result: "",
    first_appearance: true,
    question_judgement: "progress",
    time_active: false,
    check_answer: false,
    game_start_time: 0,
    game_end_time: 0,
    game_description_open: false,
    has_user: false,
    rank: 1,
    total_experience: 0, 
    maximum_experience_per_rank: 500, 
    temporary_experience: 0,
    prev_temporary_experience: 0,
    dialog_gage_up: false,
    send_game_data: false,
    rank_up: false,
    active_title: "見習いハンター",
    click_description_open: false,
    click_meta_open: false,
  }

  // ゲーム状態を管理するstate
  const [gameState, setGameState] = useState(initialState);

  // React Routerで画面遷移するとユーザーが保持できないので、
  // useEffectで再度リクエストを出す。
  // 初回レンダリング時および、依存配列の要素のどれかが
  // 変化したらuseEffectが実行される。
  // stateが変化しても、依存配列の要素が変化していないなら、
  // useEffectは実行されない                    
  // ログインしていたらsessionStateはtrueなので、最初のif文は実行されない。
  // ログインしててリロードするとsessionStateはfalseなので、最初のif文が実行される。
  // サーバー側でcurrent_userが存在しない場合、sessionStateはfalseとなる
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
    if(!Object.keys(gameState.game_management).length){
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
          next_sentence: data.questions["0"].sentence,
          next_sentence_num: 1,
          next_target_sentence: data.questions["0"].target_sentence,
          game_management: data.game_management,
          questions: data.questions,
          monster_attack: data.monster.attack,
          monster_defence: data.monster.defence,
          monster_hp: data.monster.max_hp,
          monster_max_hp: data.monster.max_hp,
          sample_answer: data.questions["0"].sample_answer,
          next_hint: data.questions["0"].hint,
          next_commentary: data.questions["0"].commentary,
          game_start_time: performance.now(),
          game_description_open: true,
          has_user: sessionState ? 
            true
          : 
            false,
          rank: sessionState ?
            data.user.rank 
          : 
            prev.rank,
          total_experience: sessionState ?
            data.user.total_experience 
          : 
            prev.total_experience, 
          maximum_experience_per_rank: sessionState ?
            data.user.maximum_experience_per_rank 
          : 
            prev.maximum_experience_per_rank, 
          temporary_experience: sessionState ?
            data.user.temporary_experience
          :
            prev.temporary_experience,
          prev_temporary_experience: sessionState ?
            data.user.prev_temporary_experience
          :
            prev.prev_temporary_experience,
          active_title: sessionState ?
            data.user.active_title
          :
            prev.active_title
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
    gameState.game_management,
    sessionState,
    requestUserActionTyps.REQUEST, 
    requestUserActionTyps.REQUEST_SUCCESS,
    requestUserActionTyps.REQUEST_FAILURE,
  ]);

  // 戦闘bgm
  useEffect(() => {
    if(gameState.game_result !== "") {
      battleAudioState.audio.loop = gameState.game_result === "progress" ? 
                                      true 
                                    : 
                                      false;
      gameState.game_result === "progress" && 
      !gameState.game_description_open &&
      !gameState.click_meta_open ? 
        battleAudioState.audio.play() 
      : 
        battleAudioState.audio.pause();
    }
  }, [
    gameState.game_result,
    gameState.game_description_open,
    gameState.click_meta_open,
    battleAudioState.audio
  ])

  // ゲームクリア時の音
  useEffect(() => {
    if(gameState.game_result === "win") {
      const audio = new Audio(GameClearSound);
      audio.play();
    }
  }, [
    gameState.game_result
  ]);

  // ゲームオーバーの音
  useEffect(() => {
    if(gameState.game_result === "lose") {
      const audio = new Audio(GameOverSound);
      audio.play();
    }
  }, [
    gameState.game_result
  ]);

  // ゲーム終了時のロジック
  // 10問クリアした時だけ、ゲームのデータをサーバー側へ送る
  // ゲーム失敗した時のデータも送ってしまうと、10問ちゃんとクリアしていない
  // レコードが存在してしまう。
  // 10問クリア。間違いなしの場合、14問クリアしたことにする。
  // gameState.send_game_dataがfalse。gameState.game_resultがwinの時だけ発動
  // そのため、絶対1回しか発動しない
  // result_timeの単位はミリ秒である。
  // ユーザーがログインしていなくても送る。
  // ログインユーザーの場合、contextを更新する
  // ログインユーザーしかsessionStateはtrueにならないので、そこを利用する
  useEffect(() => {
    if(!gameState.send_game_data && gameState.game_result === "win"){
      const timer = setTimeout(() => {
        postGameFinish({
          game_management: {
            difficulty: difficulty, 
            game_result: gameState.game_result,
            result_time: gameState.game_end_time - gameState.game_start_time
          },
          judgement: {
            correct: gameState.correct_questions, 
            incorrect: gameState.incorrect_questions
          },
          current_user: {
            rank: gameState.rank,
            total_experience: gameState.total_experience,
            maximum_experience_per_rank: gameState.maximum_experience_per_rank,
            temporary_experience: gameState.temporary_experience,
            active_title: gameState.active_title
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
              }
            });
          }
          setGameState((prev) => ({
            ...prev,
            send_game_data: data.send_game_data,
            dialog_gage_up: false,
            has_user: sessionState ? 
              true
            : 
              false,
            rank: sessionState ?
              data.user.rank 
            : 
              prev.rank,
            total_experience: sessionState ?
              data.user.total_experience 
            : 
              prev.total_experience, 
            maximum_experience_per_rank: sessionState ?
              data.user.maximum_experience_per_rank 
            : 
              prev.maximum_experience_per_rank, 
            temporary_experience: sessionState ?
              data.user.temporary_experience
            :
              prev.temporary_experience,
            prev_temporary_experience: sessionState ?
              data.user.prev_temporary_experience
            :
              prev.prev_temporary_experience,
            active_title: sessionState ?
              data.user.active_title
            :
              prev.active_title,
            rank_up: sessionState?
              data.user.rank_up
            :
              prev.rank_up
          })); 
        }).catch((e) => {
          if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
            setGameState((prev) => ({
              ...prev,
              send_game_data: true,
              dialog_gage_up: false,
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
    gameState.game_result,
    gameState.correct_questions,
    gameState.incorrect_questions,
    gameState.game_end_time, 
    gameState.game_start_time,
    gameState.maximum_experience_per_rank,
    gameState.rank, 
    gameState.result_time, 
    gameState.temporary_experience, 
    gameState.total_experience, 
    gameState.send_game_data,
    gameState.active_title,
    sessionState,
    requestUserActionTyps.REQUEST_FAILURE, 
    requestUserActionTyps.REQUEST_SUCCESS,
    dispatch
  ]);

  console.log(gameState);

  return (
    <>
      <Header />
      <FakeHeader />
      <MainContentWrapper>
        <BackGroundImageCover src={RealBackGroundImage} />
        <MainGameContentWrapper
          question_judgement={gameState.question_judgement}
        >
          <GameBlockWrapper>
            <SlideWrapper>
              <HintBar 
                hint={gameState.hint}
              />
            </SlideWrapper>
            <BattleBlockWrapper>
              <MonsterBlockWrapper>
                {
                  difficulty === 'elementary' && 
                    <>
                      <ElementaryMonster 
                        monster_hp={gameState.monster_hp}
                        monster_max_hp={gameState.monster_max_hp}
                        question_judgement={gameState.question_judgement}
                        first_appearance={gameState.first_appearance}
                        game_result={gameState.game_result}
                        game_description_open={gameState.game_description_open}
                      />
                      <ElementaryMonster 
                        monster_hp={gameState.monster_hp}
                        monster_max_hp={gameState.monster_max_hp}
                        question_judgement={gameState.question_judgement}
                        first_appearance={gameState.first_appearance}
                        game_result={gameState.game_result}
                        game_description_open={gameState.game_description_open}
                      />
                      <ElementaryMonster 
                        monster_hp={gameState.monster_hp}
                        monster_max_hp={gameState.monster_max_hp}
                        question_judgement={gameState.question_judgement}
                        first_appearance={gameState.first_appearance}
                        game_result={gameState.game_result}
                        game_description_open={gameState.game_description_open}
                      />
                    </>
                }
                {
                  difficulty === 'intermediate' &&
                    <>
                      <IntermediateMonster />
                    </>
                }
                {
                  difficulty === 'advanced' &&
                    <>
                      <AdvancedMonster />
                    </>
                }
              </MonsterBlockWrapper>
              <QuestionBlockWrapper>
                <QuestionBlock 
                  difficulty={difficulty} 
                  sentence={gameState.sentence}
                  next_sentence={gameState.next_sentence}
                  sentence_num={gameState.sentence_num}
                  next_sentence_num={gameState.next_sentence_num}
                  target_sentence={gameState.target_sentence}
                  next_target_sentence={gameState.next_target_sentence}
                  next_hint={gameState.next_hint}
                  match_array={gameState.match_array}
                  question_judgement={gameState.question_judgement}
                  gameState={gameState}
                  setGameState={setGameState}
                  input_regex_object={gameState.input_regex_object}
                  correct_questions={gameState.correct_questions}
                  incorrect_questions={gameState.incorrect_questions}
                  game_description_open={gameState.game_description_open}
                  game_result={gameState.game_result}
                  has_user={gameState.has_user}
                  rank={gameState.rank}
                  total_experience={gameState.total_experience} 
                  maximum_experience_per_rank={gameState.maximum_experience_per_rank} 
                  temporary_experience={gameState.temporary_experience}
                  prev_temporary_experience={gameState.prev_temporary_experience}
                  click_meta_open={gameState.click_meta_open}
                />
              </QuestionBlockWrapper>
            </BattleBlockWrapper>
            {  
              gameState.flash_display && 
                <CustomJudgementFlashMessage 
                  flash_display={gameState.flash_display}
                  flash_title={gameState.flash_title}
                />
            }
          </GameBlockWrapper>
          <CodeBlockWrapper>
            <CodeBlock 
              gameState={gameState} 
              setGameState={setGameState}
              target_sentence={gameState.target_sentence}
              sample_answer={gameState.sample_answer}
              monster_hp={gameState.monster_hp}
              monster_max_hp={gameState.monster_max_hp}
              monster_attack={gameState.monster_attack}
              monster_defence={gameState.monster_defence}
              question_judgement={gameState.question_judgement}
              flash_display={gameState.flash_display}
              key_available={gameState.key_available}
              user_attack={gameState.user_attack}
              sentence_num={gameState.sentence_num}
              game_description_open={gameState.game_description_open}
              click_meta_open={gameState.click_meta_open}
            />
          </CodeBlockWrapper>
          <GageBlockWrapper>
            <TimeGage 
              gameState={gameState} 
              setGameState={setGameState}
              time_active={gameState.time_active}
              monster_attack={gameState.monster_attack}
              user_defence={gameState.user_defence}
              user_hp={gameState.user_hp}
              sentence_num={gameState.sentence_num}
              click_description_open={gameState.click_description_open}
              click_meta_open={gameState.click_meta_open}
            />
            <HpGage 
              user_hp={gameState.user_hp}
              user_max_hp={gameState.user_max_hp}
            />
          </GageBlockWrapper>
        </MainGameContentWrapper>
      </MainContentWrapper>
      <GameFooter 
        setGameState={setGameState}
      />
      {
        gameState.game_result === "win" && !gameState.rank_up && !gameState.check_answer &&
          <GameClearDialog
            isOpen={gameState.game_result === "win"}
            difficulty={difficulty} 
            correct_questions={gameState.correct_questions}
            incorrect_questions={gameState.incorrect_questions}
            setGameState={setGameState}
            getGameStart={getGameStart}
            initialState={initialState}
            game_start_time={gameState.game_start_time}
            game_end_time={gameState.game_end_time}
            has_user={gameState.has_user}
            rank={gameState.rank}
            total_experience={gameState.total_experience} 
            maximum_experience_per_rank={gameState.maximum_experience_per_rank} 
            temporary_experience={gameState.temporary_experience}
            prev_temporary_experience={gameState.prev_temporary_experience}
            dialog_gage_up={gameState.dialog_gage_up}
            sessionState={sessionState}
            game_result={gameState.game_result}
            rank_up={gameState.rank_up}
          />
      }
      {
        gameState.game_result === "lose" && !gameState.check_answer &&
          <GameOverDialog
            isOpen={gameState.game_result === "lose"}
            difficulty={difficulty} 
            correct_questions={gameState.correct_questions}
            incorrect_questions={gameState.incorrect_questions}
            setGameState={setGameState}
            getGameStart={getGameStart}
            initialState={initialState}
            has_user={gameState.has_user}
            rank={gameState.rank}
            total_experience={gameState.total_experience}
            maximum_experience_per_rank={gameState.maximum_experience_per_rank}
            temporary_experience={gameState.temporary_experience} 
            prev_temporary_experience={gameState.prev_temporary_experience}
            dialog_gage_up={gameState.dialog_gage_up}
            game_result={gameState.game_result}
            rank_up={gameState.rank_up}
          />
      }
      {
        gameState.check_answer && 
          <CheckAnswerDialog
            isOpen={gameState.check_answer}
            difficulty={difficulty} 
            correct_questions={gameState.correct_questions}
            incorrect_questions={gameState.incorrect_questions}
            setGameState={setGameState}
          />
      }
      {
        gameState.game_description_open &&
          <ElementaryGameDescriptionDialog
            isOpen={gameState.game_description_open}
            setGameState={setGameState}
            game_description_open={gameState.game_description_open}
            click_description_open={gameState.click_description_open}
          />
      }
      {
        gameState.rank_up && 
          <RankUpDialog
            isOpen={gameState.rank_up}
            rank={gameState.rank}
            active_title={gameState.active_title}
            setGameState={setGameState}
            difficulty={difficulty} 
            game_result={gameState.game_result}
            rank_up={gameState.rank_up}
          />
      }
      {
        gameState.click_meta_open &&
          <CheckMetaDialog
            isOpen={gameState.click_meta_open}
            setGameState={setGameState}
          />
      }
      {
        gameState.game_result === "progress" && gameState.question_judgement === "correct" && 
          <CutImage />
      }
      {
        gameState.game_result === "progress" && gameState.question_judgement === "incorrect" && 
          <ClawImage />
      }
    </>
  );
};
