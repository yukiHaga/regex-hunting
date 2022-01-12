import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// モンスター名を取得する関数
import { getMonsterName } from '../../functions/getMonsterName.js';

// 各ゲームの獲得経験値を取得する関数
import { getExperience } from '../../functions/getExperience.js';

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

const SentenceWrapper = styled.div`
  font-size: 23px;
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
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
  next_hint,
  match_array,
  question_judgement,
  gameState,
  setGameState,
  input_regex_object,
  correct_questions,
  incorrect_questions,
  game_description_open,
  game_result,
  has_user,
  rank,
  total_experience,
  maximum_experience_per_rank,
  temporary_experience,
  prev_temporary_experience,
  click_meta_open
}) => {

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
    if (!game_description_open && !click_meta_open && sentence === `${getMonsterName(difficulty)}が現れた！`){
      const timer = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          sentence: next_sentence,
          next_sentence: prev.questions["1"].sentence,
          sentence_num: next_sentence_num,
          next_sentence_num: prev.next_sentence_num + 1,
          target_sentence: next_target_sentence,
          next_target_sentence: prev.questions["1"].target_sentence,
          hint: next_hint,
          next_hint: prev.questions["1"].hint,
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
    next_hint,
    setGameState,
    game_description_open,
    click_meta_open
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
            hint: "",
            next_hint: "",
            question_judgement: "collect",
            match_array: [],
            sample_answer: "no_sample_answer",
            input_regex_object: {},
            key_available: false,
            game_result: "win",
            time_active: false,
            game_end_time: performance.now(),
            total_experience: has_user ? 
              total_experience + getExperience(difficulty) : prev.total_experience,
            temporary_experience: has_user ? 
              temporary_experience + getExperience(difficulty) : prev.temporary_experience,
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
            hint: next_hint,
            next_hint: prev?.questions["1"]?.hint || "no_hint",
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
    next_hint,
    correct_questions.length,
    game_result,
    rank,
    total_experience,
    maximum_experience_per_rank,
    temporary_experience,
    has_user
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
            hint: "",
            next_hint: "",
            question_judgement: "incollect",
            match_array: [],
            sample_answer: "no_sample_answer",
            input_regex_object: {},
            key_available: false,
            game_result: "lose",
            time_active: false,
            game_end_time: performance.now(),
            flash_display: false,
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
            hint: next_hint,
            next_hint: prev?.questions["1"].hint || "no_hint",
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
    next_hint,
    incorrect_questions.length,
    game_result,
    rank,
    total_experience,
    maximum_experience_per_rank,
    temporary_experience
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
          <SentenceWrapper>
            {sentence}
          </SentenceWrapper>
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
