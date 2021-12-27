import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

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
`;

// 日本語にmaxlengh属性は聞かない
export const CodeBlock = ({
  gameState, 
  setGameState,
  target_sentence,
  sample_answer
}) => {

  const [inputState, setCodeState] = useState("");
  const refObject = useRef("");

  useEffect(() => {
    // 入力をコントロールするイベントリスナー
    document.addEventListener("keypress", (e) => {
      if(e.key !== 'Enter') {
        setCodeState((prev) => prev + e.key);
      }
    });

    // バックスペースをコントロールするイベントリスナー
    document.addEventListener("keydown", (e) => {
      if(e.key === 'Backspace') {
        setCodeState((prev) => prev.slice(0, -1));
      }
    });

    // イベントを消すクリーンアップ関数を返す
    return () => {
      document.removeEventListener("keypress", (e) => {
        if(e.key !== 'Enter') {
          setCodeState((prev) => prev + e.key);
        }
      });

      document.removeEventListener("keydown", (e) => {
        if(e.key === 'Backspace') {
          setCodeState((prev) => prev.slice(0, -1));
        }
      });
    }
  }, []);

  // パターンに一致した文字列を配列として返す関数
  // matchAllはIteratorを返す
  // indexは、string[1]のように使うために必要
  const getMatchWords = (
    target_sentence,
    regex_pattern
  ) => {
    const matchesIterator = target_sentence.matchAll(regex_pattern);
    const match_words = [];
    for (const match of matchesIterator) {
      match_words.push({
        match: match[0], 
        index: match.index, 
        input: match.input
      })
    }
    return match_words
  }

  // ユーザーがinputした結果をコードブロックに反映させる関数
  /*
  const handleInput = (e) => {
    setCodeState(e.target.value);
  }
  */

  return (
    <>
      <CodeBlockWrapper>
        <AnchorWrapper>
          /
        </AnchorWrapper>
        <CodeBlockDiv>
          {inputState}
        </CodeBlockDiv>
        <AnchorWrapper>
          /g
        </AnchorWrapper>
      </CodeBlockWrapper>
    </>
  );
};
