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
  match_words,
  sample_answer
}) => {

  // モンスター名を取得する関数
  const getMonsterSentence = (difficulty) => {
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
    return `${monsterName}が現れた！`;
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
  const matchIndices = (match_words) => {
    return match_words.map((value) => value.index)
  }

  const initialState = {
    sentence: getMonsterSentence(difficulty),
    target_sentence: "",
    difficulty: getJpDifficulty(difficulty)
  };

  const [sentenceState, setSentenceState] = useState(initialState);

  // 最初のメッセージからsetTimeOutを制御するif文
  // このuseEffectがあるおかげで、最初のモンスターセンテンスが
  // 問題1のセンテンスに自動で切り替わる
  useEffect(() => {
    if (sentence && sentenceState.sentence === getMonsterSentence(difficulty)){
      const timer = setTimeout(() => {
        setSentenceState({
          sentence: sentence,
          target_sentence: target_sentence,
          difficulty: getJpDifficulty(difficulty)
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

  return (
    <>
      <QuestionBlockWrapper>
        <QuestionWrapper>
          <DifficultyWrapper>
            {sentenceState.difficulty}
          </DifficultyWrapper>
          {sentenceState.sentence}
          <TargetSentenceWrapper>
            {
              sentenceState.target_sentence &&
                sentenceState.target_sentence.split('').map((value, index) => (
                  <CustomSpan 
                    key={index} 
                    backgroundcolor={matchIndices(match_words).includes(index)}
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
