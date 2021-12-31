import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

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
  target_sentence,
  match_array,
  question_finish,
  gameState,
  questions
}) => {

  // モンスター名を取得する関数
  const getMonsterName = (difficulty) => {
    let monsterName;
    switch (difficulty){
      case 'elementary':
        monsterName = 'スクータムの群れ';
        break;
      case 'intermediate':
        monsterName = 'カスアリウスの群れ';
        break;
      case 'advanced':
        monsterName = 'オルファラ・ラパクス';
        break;
      default:
        console.log('エラーが起きました');
    }
    return monsterName;
  };

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

  // マッチしたインデックスを取得する関数
  const matchIndices = (match_array) => {
    return match_array.map((value) => value.index)
  }

  const initialState = {
    sentence: `${getMonsterName(difficulty)}が現れた！`,
    sentence_num: "",
    target_sentence: "",
    jpDifficulty: getJpDifficulty(difficulty)
  };

  const [sentenceState, setSentenceState] = useState(initialState);

  // 最初のメッセージからsetTimeOutを制御するif文
  // このuseEffectがあるおかげで、最初のモンスターセンテンスが
  // 問題1のセンテンスに自動で切り替わる
  useEffect(() => {
    if (sentence && sentenceState.sentence === `${getMonsterName(difficulty)}が現れた！`){
      const timer = setTimeout(() => {
        setSentenceState({
          sentence: sentence,
          sentence_num: "Q1",
          target_sentence: target_sentence,
          jpDifficulty: getJpDifficulty(difficulty)
        });
      }, 3000);
      return () => clearTimeout(timer);
    };
  }, [
    difficulty,
    sentence,
    target_sentence,
    sentenceState.sentence
  ]);

  // question_finishがtrueの時に実行されるuseEffect
  // ダメージセンテンスがQuestionBlockに表示される
  // その後、次の問題のセンテンスが表示される
  useEffect(() => {
    if(question_finish) {
      setSentenceState((prev) => ({
        ...prev,
        sentence: `${getMonsterName(difficulty)}に10ダメージ`,
      }))
      const timer = setTimeout(() => {
        setSentenceState({
          sentence: "次の問題",
          sentence_num: "Q2",
          target_sentence: "アイウエオ",
          jpDifficulty: getJpDifficulty(difficulty)
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  },[
    question_finish,
    difficulty
  ]);

  console.log(questions);
  console.log(gameState);

  return (
    <>
      <QuestionBlockWrapper>
        <QuestionWrapper>
          <DifficultyWrapper>
            {sentenceState.sentence_num || sentenceState.jpDifficulty}
          </DifficultyWrapper>
          {sentenceState.sentence}
          <TargetSentenceWrapper>
            {
              sentenceState.target_sentence &&
                sentenceState.target_sentence.split('').map((value, index) => (
                  <CustomSpan 
                    key={index} 
                    backgroundcolor={matchIndices(match_array).includes(index)}
                  >
                    {value}
                  </CustomSpan>     
                ))
            }
          </TargetSentenceWrapper>
        </QuestionWrapper>
      </QuestionBlockWrapper>
    </>
  );
};
