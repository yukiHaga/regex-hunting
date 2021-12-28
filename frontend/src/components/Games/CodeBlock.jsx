import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';
import TypeSound from '../../sounds/type.mp3';
import BackSound from '../../sounds/back.mp3';
import ErrorSound from '../../sounds/error.mp3';
import DecisionSound from '../../sounds/decision.mp3';

const CodeBlockWrapper = styled.div`
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 3px;
  width: 860px;
  height: 53px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const AnchorWrapper = styled.div`
  height: 53px;
  font-size: 23px;
  line-height: 53px;
  color: ${COLORS.WHITE};
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  margin-left: 15px;
  margin-right: 15px;
`;

const blink = keyframes`
  0% { opacity: 0;}
  50% { opacity: 0;}
  51% { opacity: 1;}
  100% { opacity: 1;}
`;

const CodeBlockDiv = styled.div`
  height: 51px;
  width: 700px;
  font-size: 23px;
  line-height: 51px;
  background-color: ${COLORS.LIGHT_BLACK};
  color: ${COLORS.WHITE};
  font-family: YuGothic;
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
  gameState, 
  setGameState,
  target_sentence,
  sample_answer
}) => {

  const [inputState, setCodeState] = useState("");
  const inputRefObject = useRef("");

  // パターンに一致した文字列を配列として返す関数
  // matchAllはIteratorを返す
  // indexは、string[1]のように使うために必要
  const getMatchArray = (
    target_sentence,
    input_regex
  ) => {
    try {
      const regex_object = new RegExp(`${input_regex}`, 'g');
      const matchesIterator = target_sentence.matchAll(regex_object);
      const match_array = [];
      for (const match of matchesIterator) {
        match_array.push({
          match: match[0], 
          index: match.index, 
          input: match.input
        })
      }
      return match_array;
    } catch(e) {
      throw e;
    }
  }

  // getMatchArrayの戻り値を、マッチした文字列を要素とした配列に加工する関数
  const getMatchWords = (
    match_array
  ) => {
    return match_array.map((value) => value.match);
  };

  // マッチした配列と答えのマッチした配列が一致しているかを返す関数
  const getQuestionFinish = (
    input_match_words,
    sample_match_words
  ) => {
    return Boolean(
      !sample_match_words.filter((value) => {
        return !input_match_words.includes(value);
      }).length
    )
  };

  useEffect(() => {
    const handlekeyPress = (e) => {
      if(e.key !== 'Enter') {
        const audio = new Audio(TypeSound);
        audio.play();
        setCodeState((prev) => prev + e.key);
      }
    };

    const handleBackSpace = (e) => {
      if(e.key === 'Backspace') {
        const audio = new Audio(BackSound);
        audio.play();
        setCodeState((prev) => prev.slice(0, -1));
      }
    };
   
    const handleEnter = (e) => {
      try {
        if(e.key === 'Enter') {
          const input_regex = inputRefObject.current.innerText;
          const input_match_array = getMatchArray(target_sentence, input_regex);
          const sample_match_array = getMatchArray(target_sentence, sample_answer);
          const input_match_words = getMatchWords(input_match_array);
          const sample_match_words = getMatchWords(sample_match_array);
          const question_finish = getQuestionFinish(input_match_words, sample_match_words); 
          const audio = new Audio(DecisionSound);
          audio.play();
          question_finish ? 
            setGameState({
              ...gameState,
              match_array: input_match_array,
              question_finish: question_finish
            })
          : 
            setGameState({
              ...gameState,
              match_array: input_match_array,
            })
        }
      } catch(e) {
        const audio = new Audio(ErrorSound);
        audio.play();
      }
    };

    // 入力をコントロールするイベントリスナー
    document.addEventListener("keypress", handlekeyPress);

    // バックスペースをコントロールするイベントリスナー
    document.addEventListener("keydown", handleBackSpace);

    // エンターキーをコントロールするイベントリスナー
    document.addEventListener("keydown", handleEnter);

    // イベントを消すクリーンアップ関数を返す
    return () => {
      document.removeEventListener("keypress", handlekeyPress);

      document.removeEventListener("keydown", handleBackSpace);

      document.removeEventListener("keydown", handleEnter);
    }
  }, [
    gameState, 
    setGameState, 
    target_sentence,
    sample_answer
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
