import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const QuestionBlockWrapper = styled.div`
  background-color: ${COLORS.GRAY};
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

export const QuestionBlock = ({ difficulty }) => {
  return (
    <>
      <QuestionBlockWrapper>
        <QuestionWrapper>
          <DifficultyWrapper>
            初級
          </DifficultyWrapper>
          {
            difficulty === "elementary" &&
            <>
              スクータムの群れが現れた！
            </>
          }
          {
            difficulty === "intermediate" &&
            <>
              カスアリウスの群れが現れた！
            </>
          }
          {
            difficulty === "advanced" &&
            <>
              オルファ・ラパクスが現れた！
            </>
          }
          <TargetSentenceWrapper>
          </TargetSentenceWrapper>
        </QuestionWrapper>
      </QuestionBlockWrapper>
    </>
  );
};
