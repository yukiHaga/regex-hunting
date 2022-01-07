import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// モンスター名を取得する関数
import { getMonsterName } from '../../functions/getMonsterName.js';

// ユーザーがログインしているかを真偽値で返す関数
import { hasUser } from '../../functions/hasUser.js';

const QuestionBlockWrapper = styled.div`
  background-color: ${COLORS.SUB};
  border-radius: 3px;
  width: 860px;
  height: 106px;
`;

const QuestionWrapper = styled.div`
  background-color: ${COLORS.OCHER};
  border-radius: 3px;
  width: 860px;
  height: 53px;
  font-size: 23px;
  line-height: 53px;
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  text-align: center;
`;

const DifficultyWrapper = styled.div`
  background-color: ${COLORS.MAIN};
  border-radius: 3px;
  width: 75px;
  height: 53px;
  font-size: 23px;
  line-height: 53px;
  color: ${COLORS.SUB};
  text-align: center;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  position: absolute;
  z-index: 1;
`;

const TargetSentenceWrapper = styled.div`
  background-color: ${COLORS.SUB};
  border-radius: 3px;
  width: 860px;
  height: 53px;
  font-size: 23px;
  line-height: 53px;
  color: ${COLORS.BLACK};
  text-align: center;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
`;

const CustomSpan = styled.span`
  color: ${(props) => props.backgroundcolor && COLORS.WORD_BLUE};
  background-color: ${(props) => props.backgroundcolor && COLORS.WORD_BACK};
`;

export const QuestionBlock = ({ 
  difficulty, 
  sentence,
  next_sentence,
  target_sentence,
  next_target_sentence,
  sentence_num,
  next_sentence_num,
  match_array,
  question_judgement,
  gameState,
  setGameState,
  input_regex_object,
  correct_questions,
  incorrect_questions,
  game_description_open,
  game_result
}) => {

  // useContext
  // userのデータを使うだけで、userを直接更新したりはしない
  const {
    requestUserState: { 
      userState: { 
        user,
        user: {
          rank,
          total_experience,
          maximum_experience_per_rank,
          temporary_experience
        } 
      } 
    } 
  } = useContext(UserContext);

  // 難易度を日本語に変換する関数
  const getJpDifficulty = (difficulty) => {
    let jpDifficulty;
    switch (difficulty){
      case 'elementary':
        jpDifficulty = '初級';
        break;
      case 'intermediate':
        jpDifficulty = '中級';
        break;
      case 'advanced':
        jpDifficulty = '上級';
        break;
      default:
        console.log('エラーが起きました');
    }
    return jpDifficulty;
  };

  // 最初のメッセージからsetTimeOutを制御するif文
  // このuseEffectがあるおかげで、最初のモンスターセンテンスが
  // 問題1のセンテンスに自動で切り替わる
  useEffect(() => {
    if (!game_description_open && sentence === `${getMonsterName(difficulty)}が現れた！`){
      const timer = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          sentence: next_sentence,
          next_sentence: prev.questions["1"].sentence,
          sentence_num: next_sentence_num,
          next_sentence_num: prev.next_sentence_num + 1,
          target_sentence: next_target_sentence,
          next_target_sentence: prev.questions["1"].target_sentence,
          key_available: true,
          first_appearance: false,
          time_active: true
        }));
      }, 3000);
      return () => clearTimeout(timer);
    };
  }, [
    difficulty,
    sentence,
    target_sentence,
    next_sentence,
    next_sentence_num,
    next_target_sentence,
    setGameState,
    game_description_open
  ]);

  // question_judgementがcorrectの時に実行されるuseEffect
  // ダメージセンテンスがQuestionBlockに表示される
  // その後、次の問題のセンテンスが表示される
  useEffect(() => {
    if(game_result === "progress" && question_judgement === "correct") {
      setGameState((prev) => ({
        ...prev,
        sentence: `${getMonsterName(difficulty)}に10ダメージ`,
        key_available: false,
        time_active: false,
      }));
      if(correct_questions.length === 10) {
        const timer = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            sentence: "ゲームクリア！",
            next_sentence: "no_sentence",
            sentence_num: 0,
            next_sentence_num: 0,
            target_sentence: "",
            next_target_sentence: "",
            question_judgement: "collect",
            match_array: [],
            sample_answer: "no_sample_answer",
            input_regex_object: {},
            key_available: false,
            game_result: "win",
            time_active: false,
            game_end_time: performance.now(),
            has_user: hasUser(user),
            rank: hasUser(user) ? 
              rank : prev.rank,
            total_experience: hasUser(user) ? 
              total_experience + 200 : prev.total_experience,
            maximum_experience_per_rank: hasUser(user) ? 
              maximum_experience_per_rank  : prev.maximum_experience_per_rank,
            prev_temporary_experience: hasUser(user) ?
              temporary_experience : prev.prev_temporary_experience,
            temporary_experience: hasUser(user) ? 
              temporary_experience + 200 : prev.temporary_experience,
            dialog_gage_up: true,
            flash_display: false
          }));
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            sentence: next_sentence,
            next_sentence: prev?.questions["1"]?.sentence || "no_sentence",
            sentence_num: next_sentence_num,
            next_sentence_num: prev?.next_sentence_num + 1 || "no_sentence_num",
            target_sentence: next_target_sentence,
            next_target_sentence: prev?.questions["1"]?.target_sentence || "no_target_sentence",
            question_judgement: "progress",
            match_array: [],
            sample_answer: prev?.questions["0"]?.sample_answer || "no_sample_answer",
            input_regex_object: {},
            key_available: true,
            time_active: true,
            flash_display: false
          }));
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  },[
    question_judgement,
    difficulty,
    setGameState,
    next_sentence,
    next_sentence_num,
    next_target_sentence,
    correct_questions.length,
    game_result,
    user,
    rank,
    total_experience,
    maximum_experience_per_rank,
    temporary_experience
  ]);

  // question_judgementがincorrectの時に実行されるuseEffect
  useEffect(() => {
    if(game_result === "progress" && question_judgement === "incorrect") {
      setGameState((prev) => ({
        ...prev,
        sentence: `ハンターに10ダメージ`,
        key_available: false,
        time_active: false
      }));
      if(incorrect_questions.length === 5) {
        const timer = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            sentence: "ゲームオーバー",
            next_sentence: "no_sentence",
            sentence_num: 0,
            next_sentence_num: 0,
            target_sentence: "",
            next_target_sentence: "",
            question_judgement: "incollect",
            match_array: [],
            sample_answer: "no_sample_answer",
            input_regex_object: {},
            key_available: false,
            game_result: "lose",
            time_active: false,
            game_end_time: performance.now(),
            flash_display: false
          }));
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            sentence: next_sentence,
            next_sentence: prev?.questions["1"]?.sentence || "no_sentence",
            sentence_num: next_sentence_num,
            next_sentence_num: prev?.next_sentence_num + 1 || "no_sentence_num",
            target_sentence: next_target_sentence,
            next_target_sentence: prev?.questions["1"]?.target_sentence || "no_target_sentence",
            question_judgement: "progress",
            match_array: [],
            sample_answer: prev?.questions["0"]?.sample_answer || "no_sample_answer",
            input_regex_object: {},
            key_available: true,
            time_active: true,
            flash_display: false
          }));
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  },[
    question_judgement,
    difficulty,
    setGameState,
    next_sentence,
    next_sentence_num,
    next_target_sentence,
    incorrect_questions.length,
    game_result,
  ]);

  // マッチした箇所をリプレイスするライブラリをrequireしてくる
  const reactStringReplace = require('react-string-replace');

  return (
    <>
      <QuestionBlockWrapper>
        <QuestionWrapper>
          <DifficultyWrapper>
            {sentence_num ? `Q${sentence_num}` : getJpDifficulty(difficulty)}
          </DifficultyWrapper>
          {sentence}
          <TargetSentenceWrapper>
            {
              target_sentence &&
                reactStringReplace(target_sentence, input_regex_object, (match, i) => (
                  <CustomSpan 
                    key={i} 
                    backgroundcolor={i}
                  >
                    {match}
                  </CustomSpan>     
                ))
            }
          </TargetSentenceWrapper>
        </QuestionWrapper>
      </QuestionBlockWrapper>
    </>
  );
};
