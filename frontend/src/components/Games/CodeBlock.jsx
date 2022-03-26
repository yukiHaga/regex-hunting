import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Sounds
import TypeSound from '../../sounds/type_25.mp3';
import BackSound from '../../sounds/back_25.mp3';
import ErrorSound from '../../sounds/error_25.mp3';
import DecisionSound from '../../sounds/decision_25.mp3';
import CutMonsterSound from '../../sounds/cut_25.mp3';

// calculateDamage
import { calculateDamage } from '../../functions/calculateDamage';

const CodeBlockWrapper = styled.div`
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 3px;
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 0.67%;
  padding-bottom: 0.67%;
  padding-right: 1%;
  padding-left: 1%;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
`;

const AnchorWrapper = styled.div`
  font-size: 1.4em;
  color: ${COLORS.WHITE};
  font-style: normal;
`;

const blink = keyframes`
  0% { opacity: 0;}
  50% { opacity: 0;}
  51% { opacity: 1;}
  100% { opacity: 1;}
`;

const CodeBlockDiv = styled.div`
  width: 100%;
  padding-left: 2%;
  font-size: 1.4em;
  background-color: ${COLORS.LIGHT_BLACK};
  color: ${COLORS.WHITE};
  font-style: normal;
  font-weight: 500;
  outline: none;
  border: none;
  text-align: center;
  ::placeholder {
    color: #eeeeee;
    opacity: 0.5;
  };
  ::-webkit-input-placeholder {
    color: #eeeeee;
    opacity: 0.5;
  };
  :-ms-input-placeholder {
    color: #eeeeee;
    opacity: 0.5;
  };
  &:after {
    content: "_";
    animation: ${blink} 1s infinite;
  };
`;

// 日本語にmaxlengh属性は聞かない
export const CodeBlock = ({
  correctQuestions,
  questions,
  setGameState,
  targetSentence,
  sampleAnswer,
  monsterHp,
  monsterDefence,
  questionJudgement,
  keyAvailable,
  userAttack,
  sentenceNum,
  gameDescriptionOpen,
  clickMetaOpen
}) => {

  const [inputState, setCodeState] = useState("");
  const inputRefObject = useRef("");

  // regexObjectを生成する関数
  // テンプレートリテラルの括弧(を無くすと、キャプチャしたものが配列に含まれなくなる。
  // そのため、マッチした文字列がQuestionBlockに正確に反映されない時がある。
  const getRegexObject = (
    inputRegex
  ) => {
    return new RegExp(`(${inputRegex})`, 'g');
  }

  // パターンに一致した文字列を配列として返す関数
  // matchAllはIteratorを返す
  // indexは、string[1]のように使うために必要
  const getMatchArray = (
    targetSentence,
    inputRegex
  ) => {
    try {
      const regexObject = new RegExp(`${inputRegex}`, 'g');
      const matchesIterator = targetSentence.matchAll(regexObject);
      const matchArray = [];
      for (const match of matchesIterator) {
        matchArray.push({
          match: match[0],
          index: match.index
        })
      }
      return matchArray;
    } catch(e) {
      throw e;
    }
  }

  // マッチした配列と答えのマッチした配列が一致しているかを返す関数
  // V2では位置も考慮に入れている
  const getQuestionJudgementV2 = (
    inputMatchArray,
    sampleMatchArray
  ) => {
    if(inputMatchArray.length > 0) {
      if(
        Boolean(
          !inputMatchArray.filter((value, index) => {
            return !(sampleMatchArray[index]?.match === value.match && sampleMatchArray[index]?.index === value.index);
          }).length
      ) && inputMatchArray.length === sampleMatchArray.length) {
        return "correct";
      } else {
        return "progress";
      }
    } else {
      return "progress";
    }
  };

  const handlekeyPress = useCallback((e) => {
    if(e.key !== 'Enter' && keyAvailable === true) {
      const audio = new Audio(TypeSound);
      audio.play();
      setCodeState((prev) => prev + e.key);
    }
  }, [
    keyAvailable
  ]);

  const handleBackSpace = useCallback((e) => {
    if(e.key === 'Backspace' && keyAvailable === true) {
      const audio = new Audio(BackSound);
      audio.play();
      setCodeState((prev) => prev.slice(0, -1));
    }
  }, [
    keyAvailable
  ]);

  // questionJudgementがprogressならEnterを押せるようにする
  const handleEnter = useCallback((e) => {
    try {
      if(e.key === 'Enter' && questionJudgement === 'progress' && keyAvailable === true) {
        const inputRegex = inputRefObject.current.innerText;
        const inputRegexObject = getRegexObject(inputRegex);
        const inputMatchArray = getMatchArray(targetSentence, inputRegex);
        const sampleMatchArray = getMatchArray(targetSentence, sampleAnswer);
        const currentQuestionJudgement = getQuestionJudgementV2(
          inputMatchArray,
          sampleMatchArray
        );
        const audio = new Audio(DecisionSound);
        audio.play();
        if(currentQuestionJudgement === "correct") {
          correctQuestions.push({
            question: questions[0],
            sentenceNum: sentenceNum,
            inputRegex: inputRegex
          });
          questions.shift();
          const currentHp = monsterHp - calculateDamage(userAttack, monsterDefence);
          const audio = new Audio(CutMonsterSound);

          // エンター押して正解した時に実行されるsetGameState
          setGameState((prev) => ({
            ...prev,
            inputRegex: inputRegex,
            inputRegexObject: inputRegexObject,
            matchArray: inputMatchArray,
            questionJudgement: currentQuestionJudgement,
            correctQuestions: prev.correctQuestions,
            questions: prev.questions,
            monsterHp: currentHp,
            flashDisplay: true,
            flashTitle: "Good",
            keyAvailable: false,
          }));
          audio.play();
          setCodeState("");
        } else {
          // エンター押して不正解の時に実行されるsetGameState
          setGameState((prev) => ({
            ...prev,
            inputRegex: inputRegex,
            inputRegexObject: inputRegexObject,
            matchArray: inputMatchArray,
          }));
        }
      }
    } catch(e) {
      const audio = new Audio(ErrorSound);
      audio.play();
    }
  }, [
    correctQuestions,
    keyAvailable,
    monsterDefence,
    monsterHp,
    questionJudgement,
    questions,
    sampleAnswer,
    sentenceNum,
    setGameState,
    targetSentence,
    userAttack,
  ]);

  // イベントリスナー
  useEffect(() => {
    // gameDescriptionOpenがfalseかつclickMetaOpenがfalseの時に実行される
    // つまり、スライド一覧とメタ文字一覧のダイアログが開いていないとき、if文の条件式がtrueになる
    if(!gameDescriptionOpen && !clickMetaOpen) {
      // 入力をコントロールするイベントリスナー
      document.addEventListener("keypress", handlekeyPress);

      // バックスペースをコントロールするイベントリスナー
      document.addEventListener("keydown", handleBackSpace);

      // エンターキーをコントロールするイベントリスナー
      document.addEventListener("keydown", handleEnter);

      // アンマウント時の処理をここに書く
      // イベントを消すクリーンアップ関数を返す
      return () => {
        document.removeEventListener("keypress", handlekeyPress);

        document.removeEventListener("keydown", handleBackSpace);

        document.removeEventListener("keydown", handleEnter);
      }
    }
  }, [
    handlekeyPress,
    handleBackSpace,
    handleEnter,
    gameDescriptionOpen,
    clickMetaOpen
  ]);

  // questionJudgementがfalseの時に実行される処理
  // この処理のおかげで、時間内に解けなかった時、
  // コードブロックを初期化してくれる
  useEffect(() => {
    if(questionJudgement === 'incorrect') {
      setCodeState("");
    }
  },[
    questionJudgement
  ]);

  return (
    <>
      <CodeBlockWrapper>
        <AnchorWrapper>
          /
        </AnchorWrapper>
        <CodeBlockDiv ref={inputRefObject}>
          {inputState}
        </CodeBlockDiv>
        <AnchorWrapper>
          /g
        </AnchorWrapper>
      </CodeBlockWrapper>
    </>
  );
};
