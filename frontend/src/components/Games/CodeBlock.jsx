import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Sounds
import TypeSound from '../../sounds/type.mp3';
import BackSound from '../../sounds/back.mp3';
import ErrorSound from '../../sounds/error.mp3';
import DecisionSound from '../../sounds/decision.mp3';
import CutMonster from '../../sounds/cut.mp3';

// プレイヤーの攻撃力が定義してある定数
// プレイヤーのアタックは20で固定とする
import { PLAYER_STATUS } from '../../constants.js';

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
  sample_answer,
  monster_hp,
  monster_max_hp,
  monster_attack,
  monster_defence,
  question_finish,
  flash_display,
  commentary,
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

  // モンスターに与えるダメージを計算する関数
  const calculateDamage = (defence) => {
    const damage = PLAYER_STATUS.ATTACK - defence;
    return damage;
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

    // question_finishがfalseならEnterを押せるようにする
    const handleEnter = (e) => {
      try {
        if(e.key === 'Enter' && question_finish === false) {
          const input_regex = inputRefObject.current.innerText;
          const input_match_array = getMatchArray(target_sentence, input_regex);
          const sample_match_array = getMatchArray(target_sentence, sample_answer);
          const input_match_words = getMatchWords(input_match_array);
          const sample_match_words = getMatchWords(sample_match_array);
          const current_question_finish = getQuestionFinish(
            input_match_words, 
            sample_match_words
          ); 
          const audio = new Audio(DecisionSound);
          audio.play();
          if(current_question_finish) {
            gameState.correct_questions.push(gameState.questions[0]);
            gameState.questions.shift();
            const current_hp = monster_hp - calculateDamage(monster_defence);
            const audio = new Audio(CutMonster);
            setGameState((prev) => ({
              ...prev,
              match_array: input_match_array,
              question_finish: current_question_finish,
              correct_questions: prev.correct_questions,
              questions: prev.questions,
              monster_hp: current_hp,
              flash_display: true,
              commentary: prev.next_commentary,
              next_commentary: prev.questions["0"].commentary
            }));
            audio.play();
            setCodeState("");
          } else {
            setGameState({
              ...gameState,
              match_array: input_match_array,
            });
          }
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
    sample_answer,
    monster_hp,
    monster_defence,
    question_finish,
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
