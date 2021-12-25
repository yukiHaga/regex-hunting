import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import TypeWriterEffect from 'react-typewriter-effect';

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

  const messageAudio = new Audio(音声ファイルパス);

  useLayoutEffect(() => {
    messageAudio.play()
  }, [])

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
              <TypeWriterEffect
                textStyle={{ 
                  fontSize: '23px',
                  color: `${COLORS.BLACK}`,
                  fontFamily: 'YuGothic',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  textAlign: 'center',
                  lineHeight: '53px',
                  backGroundColor: `${COLORS.OCHER}`,
                  borderRadius: '3px',
                  width: '860px',
                  height: '53px',
                }}
                startDelay={1000}
                cursorColor={`${COLORS.BLACK}`}
                text="スクータムの群れが現れた！"
                typeSpeed={50}
                hideCursorAfterText={true}
              />
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
