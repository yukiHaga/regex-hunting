import React, { useState, useEffect } from 'react';
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

const CodeBlockInput = styled.input`
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

  const [codeState, setCodeState] = useState("");

  // ユーザーがinputした結果をコードブロックに反映させつつ、
  // inputした結果とtarget_sentenceが一致したかを判定する関数
  const handleInput = (e) => {
    setCodeState(e.target.value);
    console.log(e.target.value);
    setGameState({
      ...gameState,
    });
  }

  useEffect(() => {
    document.getElementById('code-block').focus();
  }, []);

  return (
    <>
      <CodeBlockWrapper>
        <AnchorWrapper>
          /
        </AnchorWrapper>
        <CodeBlockInput 
          type='text' 
          id='code-block' 
          value={codeState} 
          maxLength={30}
          onChange={(e) => handleInput(e)} 
          placeholder="Input Your Regex"
        />
        <AnchorWrapper>
          /g
        </AnchorWrapper>
      </CodeBlockWrapper>
    </>
  );
};
