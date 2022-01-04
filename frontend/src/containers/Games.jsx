import React, { useState, Fragment, useEffect, useLayoutEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Image
import BackGroundImage from '../images/background.png';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { MetaMenuBar } from '../components/Games/MetaMenuBar.jsx';
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

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// ゲームステータス, 問題, モンスターデータを取得する関数 
import { getGameStart } from '../apis/gameManagement.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// モンスター名を取得する関数
import { getMonsterName } from '../functions/getMonsterName.js';

// ゲームクリア音
import GameClearSound from '../sounds/game_clear.mp3';

// ゲームオーバー音
import GameOverSound from '../sounds/game_over.mp3';

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
  padding-left: 33px;
`;

// SlideWrapperコンポーネント
const SlideWrapper = styled.div`
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
`;

// BattleBlockWrapperコンポーネント
// background-color: #F6F6DC;  
const BattleBlockWrapper = styled.div`
  height: 498px;
  width: 920px;
  margin-left: 7px;
`;

// MonsterBlockWrapperコンポーネント
const MonsterBlockWrapper = styled.div`
  height: 370px;
  width: 900px;
  margin-left: 43px;
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
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
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
    requestUserState: { sessionState }, 
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
    game_description_open: false
  }

  // ゲーム状態を管理するstate
  const [gameState, setGameState] = useState(initialState);

  // React Routerで画面遷移するとユーザーが保持できないので、
  // useEffectで再度リクエストを出す。
  // 初回レンダリング時および、
  // dispatch, difficulty, sessionState, requestUserActionTyps.REQUEST, 
  // requestUserActionTyps.REQUEST_SUCCESS, requestUserActionTyps.REQUEST_FAILURE
  // のどれかが変化したらuseEffectが実行される。
  // stateが変化しても、依存配列の要素が変化していないなら、
  // useEffectは実行されない                    
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
    if(sessionState === false && !Object.keys(gameState.game_management).length){
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
          next_commentary: data.questions["0"].commentary,
          game_result: data.game_management.game_result,
          game_start_time: performance.now(),
          game_description_open: true
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
    requestUserActionTyps.REQUEST_FAILURE
  ]);

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

  console.log(gameState);

  return (
    <>
      <Header />
      <FakeHeader />
      <MainContentWrapper>
        <BackGroundImageCover src={BackGroundImage} />
        <MainGameContentWrapper
          question_judgement={gameState.question_judgement}
        >
          <GameBlockWrapper>
            <SlideWrapper>
              <MetaMenuBar />
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
                      />
                      <ElementaryMonster 
                        monster_hp={gameState.monster_hp}
                        monster_max_hp={gameState.monster_max_hp}
                        question_judgement={gameState.question_judgement}
                        first_appearance={gameState.first_appearance}
                        game_result={gameState.game_result}
                      />
                      <ElementaryMonster 
                        monster_hp={gameState.monster_hp}
                        monster_max_hp={gameState.monster_max_hp}
                        question_judgement={gameState.question_judgement}
                        first_appearance={gameState.first_appearance}
                        game_result={gameState.game_result}
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
                  match_array={gameState.match_array}
                  question_judgement={gameState.question_judgement}
                  gameState={gameState}
                  setGameState={setGameState}
                  input_regex_object={gameState.input_regex_object}
                  correct_questions={gameState.correct_questions}
                  incorrect_questions={gameState.incorrect_questions}
                />
              </QuestionBlockWrapper>
            </BattleBlockWrapper>
            {  
              gameState.flash_display && 
                <CustomJudgementFlashMessage 
                  flash_display={gameState.flash_display}
                  commentary={gameState.commentary}
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
            />
            <HpGage 
              user_hp={gameState.user_hp}
              user_max_hp={gameState.user_max_hp}
            />
          </GageBlockWrapper>
        </MainGameContentWrapper>
      </MainContentWrapper>
      <GameFooter />
      {
        gameState.game_result === "win" && !gameState.check_answer &&
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
          />
      }
    </>
  );
};
