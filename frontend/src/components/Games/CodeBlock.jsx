import React, { useState, useEffect, useCallback } from 'react';
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

const CodeBlockTextWrapper = styled.div`
  height: 53px;
  font-size: 23px;
  line-height: 53px;
  color: ${COLORS.WHITE};
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
`;

export const CodeBlock = () => {

  const [state, setState] = useState("");

  const keyFunction = useCallback((e) => {
    setState( prevState => {
      const newState = prevState + e.key; 
      return newState;
    } );
  }, []);

  // useEffectの第一引数の副作用関数は、コンポーネントの初回レンダリング時、
  // および、keyFunctionが変化したときに実行される
  // クリーンアップ関数はコンポーネントがアンマウント, 副作用関数が再実行
  // された時に実行される。クリーンアップ関数を副作用関数の戻り値として返すことで、
  // コンポーネントがレンダリングされるたびにイベントの登録が重複するのを防ぐことができる
  useEffect(() => {
    document.addEventListener("keydown", keyFunction, false);
    return () => {
      document.removeEventListener("keydown", keyFunction, false);
    }
  }, [keyFunction]);

  return (
    <>
      <CodeBlockWrapper>
        <AnchorWrapper>
          /
        </AnchorWrapper>
        <CodeBlockTextWrapper>
          {state} 
        </CodeBlockTextWrapper>
        <AnchorWrapper>
          /g
        </AnchorWrapper>
      </CodeBlockWrapper>
    </>
  );
};
