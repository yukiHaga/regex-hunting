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
import { calculateDamage } from '../../functions/calculateDamage.js';

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
  correct_questions,
  questions,
  setGameState,
  target_sentence,
  sample_answer,
  monster_hp,
  monster_max_hp,
  monster_attack,
  monster_defence,
  question_judgement,
  flash_display,
  commentary,
  key_available,
  user_attack,
  sentence_num,
  game_description_open,
  click_meta_open
}) => {

  const [inputState, setCodeState] = useState("");
  const inputRefObject = useRef("");

  // regex_objectを生成する関数
  // テンプレートリテラルの括弧(を無くすと、なぜか機能しなくなったので、残しとく。
  const getRegexObject = (
    input_regex
  ) => {
    const input_regex_object = new RegExp(`(${input_regex})`, 'g');
    return input_regex_object;
  }

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
  // ロジックに不備があったので、改善した
  // 正解判定のロジックなので、いつかまた修正が必要かもしれない
  const getQuestionJudgement = (
    input_match_words,
    sample_match_words
  ) => {
    if(input_match_words.length > 0) {
      if(
        Boolean(
          !input_match_words.filter((value, index) => {
            return !(sample_match_words[index] === value);
          }).length
      ) && input_match_words.length === sample_match_words.length) {
        return "correct";
      } else {
        return "progress";
      }
    } else {
      return "progress";
    }
  };

  const handlekeyPress = useCallback((e) => {
    if(e.key !== 'Enter' && key_available === true) {
      const audio = new Audio(TypeSound);
      audio.play();
      setCodeState((prev) => prev + e.key);
    }
  }, [
    key_available
  ]);

  const handleBackSpace = useCallback((e) => {
    if(e.key === 'Backspace' && key_available === true) {
      const audio = new Audio(BackSound);
      audio.play();
      setCodeState((prev) => prev.slice(0, -1));
    }
  }, [
    key_available
  ]);

  // question_judgementがprogressならEnterを押せるようにする
  const handleEnter = useCallback((e) => {
    try {
      if(e.key === 'Enter' && question_judgement === 'progress' && key_available === true) {
        const input_regex = inputRefObject.current.innerText;
        const input_regex_object = getRegexObject(input_regex); 
        const input_match_array = getMatchArray(target_sentence, input_regex);
        const sample_match_array = getMatchArray(target_sentence, sample_answer);
        const input_match_words = getMatchWords(input_match_array);
        const sample_match_words = getMatchWords(sample_match_array);
        const current_question_judgement = getQuestionJudgement(
          input_match_words, 
          sample_match_words
        ); 
        const audio = new Audio(DecisionSound);
        audio.play();
        if(current_question_judgement === "correct") {
          correct_questions.push({
            question: questions[0],
            sentence_num: sentence_num,
            input_regex: input_regex
          });
          questions.shift();
          const current_hp = monster_hp - calculateDamage(user_attack, monster_defence);
          const audio = new Audio(CutMonsterSound);

          // エンター押して正解した時に実行されるsetGameState
          setGameState((prev) => ({
            ...prev,
            input_regex_object: input_regex_object,
            match_array: input_match_array,
            question_judgement: current_question_judgement,
            correct_questions: prev.correct_questions,
            questions: prev.questions,
            monster_hp: current_hp,
            flash_display: true,
            flash_title: "Good",
            commentary: prev.next_commentary,
            next_commentary: prev?.questions["0"]?.commentary || "no_next_commentary",
            key_available: false,
          }));
          audio.play();
          setCodeState("");
        } else {
          // エンター押して不正解の時に実行されるsetGameState
          setGameState((prev) => ({
            ...prev,
            input_regex_object: input_regex_object,
            match_array: input_match_array,
          }));
        }
      }
    } catch(e) {
      const audio = new Audio(ErrorSound);
      audio.play();
    }
  }, [
    correct_questions,
    key_available,
    monster_defence,
    monster_hp,
    question_judgement,
    questions,
    sample_answer,
    sentence_num,
    setGameState,
    target_sentence,
    user_attack,
  ]);

  // イベントリスナー
  useEffect(() => {
    // game_description_openがfalseかつclick_meta_openがfalseの時に実行される
    // つまり、スライド一覧とメタ文字一覧のダイアログが開いていないとき、if文の条件式がtrueになる
    if(!game_description_open && !click_meta_open) {
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
    game_description_open,
    click_meta_open
  ]);

  // question_judgementがfalseの時に実行される処理
  // この処理のおかげで、時間内に解けなかった時、
  // コードブロックを初期化してくれる
  useEffect(() => {
    if(question_judgement === 'incorrect') {
      setCodeState("");
    }
  },[
    question_judgement
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
