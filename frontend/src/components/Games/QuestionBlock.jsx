import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// モンスター名を取得する関数
import { getMonsterName } from '../../functions/getMonsterName';

// 各ゲームの獲得経験値を取得する関数
import { getExperience } from '../../functions/getExperience';

// サニタイズ用のライブラリをインポートしてくる
import DOMPurify from "dompurify";

const QuestionBlockWrapper = styled.div`
  background-color: ${COLORS.SUB};
  border-radius: 3px;
  height: 13.4vh;
  margin: 0 auto;
  width: 60%;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
`;

const QuestionWrapper = styled.div`
  background-color: ${COLORS.OCHER};
  border-radius: 3px;
  font-size: 1.3em;
  color: ${COLORS.BLACK};
  font-style: normal;
  font-weight: 500;
  text-align: center;
`;

// 問題文
const SentenceWrapper = styled.div`
  font-size: 1em;
  color: ${COLORS.BLACK};
  font-style: normal;
  padding-top: 1.25%;
  padding-bottom: 1.25%;
  border-radius: 3px;
`;

// 問題文の左隣にある問題カウンター
const DifficultyWrapper = styled.div`
  background-color: ${COLORS.MAIN};
  border-radius: 3px 3px 3px 0;
  width: 5%;
  font-size: 1em;
  color: ${COLORS.SUB};
  text-align: center;
  font-style: normal;
  position: absolute;
  z-index: 0;
  padding-top: 0.74%;
  padding-bottom: 0.74%;
`;

// ターゲットセンテンス
const TargetSentenceWrapper = styled.div`
  background-color: ${COLORS.SUB};
  border-radius: 0, 0, 3px 3px;
  font-size: 1.1em;
  color: ${COLORS.BLACK};
  text-align: center;
  font-style: normal;
  vertical-align: center;
  padding-top: 1%;
`;

export const QuestionBlock = ({
  difficulty,
  sentence,
  nextSentence,
  sentenceNum,
  nextSentenceNum,
  targetSentence,
  nextTargetSentence,
  nextHint,
  questionJudgement,
  setGameState,
  inputRegex,
  inputRegexObject,
  correctQuestions,
  incorrectQuestions,
  gameDescriptionOpen,
  gameResult,
  hasUser,
  rank,
  totalExperience,
  maximumExperiencePerRank,
  temporaryExperience,
  clickMetaOpen
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

  // 難易度毎のモンスターからダメージを喰らう時のセンテンス
  const getDamageSentence = (difficulty) => {
    let damageSentence;
    switch (difficulty){
      case 'elementary':
        damageSentence = 'ハンターに20ダメージ';
        break;
      case 'intermediate':
        damageSentence = 'ハンターに20ダメージ';
        break;
      case 'advanced':
        damageSentence = 'ハンターに25ダメージ';
        break;
      default:
        console.log('エラーが起きました');
    }
    return damageSentence;
  };

  // 難易度毎のモンスターからダメージを喰らう時のセンテンスは、1回計算すれば十分なので、メモ化する
  const memoDamageSentence = useMemo(() => getDamageSentence(difficulty), [difficulty])

  // 各難易度における不正解の上限数を出力する関数
  // この関数の値を使用することで、難易度毎のゲームの終了タイミングをコントロールできる
  const getIncorrectCount = (difficulty) => {
    let incorrectCount;
    switch (difficulty){
      case 'elementary':
        incorrectCount = 5;
        break;
      case 'intermediate':
        incorrectCount = 5;
        break;
      case 'advanced':
        incorrectCount = 4;
        break;
      default:
        console.log('エラーが起きました');
    }
    return incorrectCount;
  };

  // 各難易度における不正解の上限数は、1回計算すれば十分なので、メモ化する
  const memoIncorrectCount = useMemo(() => getIncorrectCount(difficulty), [difficulty])

  // 最初のメッセージからsetTimeOutを制御するif文
  // このuseEffectがあるおかげで、最初のモンスターセンテンスが
  // 問題1のセンテンスに自動で切り替わる
  useEffect(() => {
    if (!gameDescriptionOpen && !clickMetaOpen && sentence === `${getMonsterName(difficulty)}が現れた！`){
      const timer = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          sentence: nextSentence,
          nextSentence: prev.questions["1"].sentence,
          sentenceNum: nextSentenceNum,
          nextSentenceNum: prev.nextSentenceNum + 1,
          targetSentence: nextTargetSentence,
          nextTargetSentence: prev.questions["1"].target_sentence,
          hint: nextHint,
          nextHint: prev.questions["1"].hint,
          keyAvailable: true,
          firstAppearance: false,
          timeActive: true,
          gameResult: "progress"
        }));
      }, 3000);
      return () => clearTimeout(timer);
    };
  }, [
    difficulty,
    sentence,
    targetSentence,
    nextSentence,
    nextSentenceNum,
    nextTargetSentence,
    nextHint,
    setGameState,
    gameDescriptionOpen,
    clickMetaOpen
  ]);

  // questionJudgementがcorrectの時に実行されるuseEffect
  // ダメージセンテンスがQuestionBlockに表示される
  // その後、次の問題のセンテンスが表示される
  useEffect(() => {
    if(gameResult === "progress" && questionJudgement === "correct") {
      setGameState((prev) => ({
        ...prev,
        sentence: `${getMonsterName(difficulty)}に10ダメージ`,
        keyAvailable: false,
        timeActive: false,
      }));
      if(correctQuestions.length === 10) {
        const timer = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            sentence: "ゲームクリア！",
            nextSentence: "no_sentence",
            sentenceNum: 0,
            nextSentenceNum: 0,
            targetSentence: "",
            nextTargetSentence: "",
            hint: "",
            nextHint: "",
            questionJudgement: "correct",
            matchArray: [],
            sampleAnswer: "no_sample_answer",
            inputRegexObject: {},
            keyAvailable: false,
            gameResult: "win",
            timeActive: false,
            gameEndTime: performance.now(),
            totalExperience: hasUser ?
              totalExperience + getExperience(difficulty) : prev.totalExperience,
            temporaryExperience: hasUser ?
              temporaryExperience + getExperience(difficulty) : prev.temporaryExperience,
            dialogGageUp: true,
            flashDisplay: false
          }));
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            sentence: nextSentence,
            nextSentence: prev?.questions["1"]?.sentence || "no_sentence",
            sentenceNum: nextSentenceNum,
            nextSentenceNum: prev?.nextSentenceNum + 1 || "no_sentence_num",
            targetSentence: nextTargetSentence,
            nextTargetSentence: prev?.questions["1"]?.target_sentence || "no_target_sentence",
            questionJudgement: "progress",
            matchArray: [],
            sampleAnswer: prev?.questions["0"]?.sample_answer || "no_sample_answer",
            hint: nextHint,
            nextHint: prev?.questions["1"]?.hint || "no_hint",
            inputRegexObject: {},
            keyAvailable: true,
            timeActive: true,
            flashDisplay: false,
          }));
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  },[
    questionJudgement,
    difficulty,
    setGameState,
    nextSentence,
    nextSentenceNum,
    nextTargetSentence,
    nextHint,
    correctQuestions.length,
    gameResult,
    rank,
    totalExperience,
    maximumExperiencePerRank,
    temporaryExperience,
    hasUser
  ]);

  // questionJudgementがincorrectの時に実行されるuseEffect
  useEffect(() => {
    if(gameResult === "progress" && questionJudgement === "incorrect") {
      setGameState((prev) => ({
        ...prev,
        sentence: memoDamageSentence,
        keyAvailable: false,
        timeActive: false
      }));
      if(incorrectQuestions.length === memoIncorrectCount) {
        const timer = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            sentence: "ゲームオーバー",
            nextSentence: "no_sentence",
            sentenceNum: 0,
            nextSentenceNum: 0,
            targetSentence: "",
            nextTargetSentence: "",
            hint: "",
            nextHint: "",
            questionJudgement: "incorrect",
            matchArray: [],
            sampleAnswer: "no_sample_answer",
            inputRegexObject: {},
            keyAvailable: false,
            gameResult: "lose",
            timeActive: false,
            gameEndTime: performance.now(),
            flashDisplay: false,
          }));
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            sentence: nextSentence,
            nextSentence: prev?.questions["1"]?.sentence || "no_sentence",
            sentenceNum: nextSentenceNum,
            nextSentenceNum: prev?.nextSentenceNum + 1 || "no_sentence_num",
            targetSentence: nextTargetSentence,
            nextTargetSentence: prev?.questions["1"]?.target_sentence || "no_target_sentence",
            questionJudgement: "progress",
            matchArray: [],
            sampleAnswer: prev?.questions["0"]?.sample_answer || "no_sample_answer",
            hint: nextHint,
            nextHint: prev?.questions["1"].hint || "no_hint",
            inputRegexObject: {},
            keyAvailable: true,
            timeActive: true,
            flashDisplay: false
          }));
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  },[
    questionJudgement,
    difficulty,
    setGameState,
    nextSentence,
    nextSentenceNum,
    nextTargetSentence,
    nextHint,
    incorrectQuestions.length,
    gameResult,
    rank,
    totalExperience,
    maximumExperiencePerRank,
    temporaryExperience,
    memoIncorrectCount,
    memoDamageSentence
  ]);

  // マッチした文字列にspanタグを挿入する関数
  const stringReplace = (target, re) => {
    return target.replace(re, (match) => (
      `<span style='color: ${COLORS.WORD_BLUE}; background-color: ${COLORS.WORD_BACK};'>` + match + "</span>"
    ));
  }

  return (
    <>
      <QuestionBlockWrapper>
        <QuestionWrapper>
          <DifficultyWrapper>
            {sentenceNum ? `Q${sentenceNum}` : getJpDifficulty(difficulty)}
          </DifficultyWrapper>
          <SentenceWrapper>
            {sentence}
          </SentenceWrapper>
          <TargetSentenceWrapper>
            {
              inputRegexObject instanceof RegExp ?
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(stringReplace(targetSentence, inputRegexObject))
                  }}
                />
              :
                targetSentence
            }
          </TargetSentenceWrapper>
        </QuestionWrapper>
      </QuestionBlockWrapper>
    </>
  );
};
