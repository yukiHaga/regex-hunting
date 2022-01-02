import React from 'react';
import styled, { keyframes } from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Sounds
import AttackSound from '../../sounds/attack.mp3';

const TimeGageWrapper = styled.div`
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 3px 3px 0 0;
  width: 100%;
  height: 36px;
  display: flex;
  box-sizing: border-box;
  border: 5px solid;
  border-color: ${COLORS.GAGE_GRAY};
`;

const TypeWrapper = styled.div`
  height: 26px;
  width: 120px;
  font-size: 18px;
  line-height: 26px;
  background-color: ${COLORS.GAGE_GRAY};
  color: ${COLORS.BROWN};
  font-family: YuGothic;
  font-weight: bold;
  text-align: center;
`;

// ゲージ減少のアニメーション
const TimeGageAnime = keyframes`
  from {
    width: 100%;
  }

  to {
    width: 0;
  }
`;

const GageWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${COLORS.YELLOW};
  box-sizing: border-box;
  border: none;
  outline: none;
  animation: ${(props) => props.time_active && TimeGageAnime} 40s linear 1;
`;

const GageOuterWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const TimeGage = ({
  gameState,
  setGameState,
  time_active
}) => {

  // タイムゲージが0になった時に実行される関数
  const timeOut = () => {
    gameState.incorrect_questions.push(gameState.questions[0]);
    gameState.questions.shift();
    const audio = new Audio(AttackSound);
    audio.play();
    setGameState((prev) => ({
      ...prev,
      question_judgement: "incorrect",
      incorrect_questions: prev.incorrect_questions,
      questions: prev.questions,
      flash_display: true,
      commentary: prev.next_commentary,
      next_commentary: prev?.questions["0"]?.commentary || "no_next_commentary",
      key_available: false
    }));
  };

  return (
    <>
      <TimeGageWrapper>
        <TypeWrapper>
          TIME
        </TypeWrapper>
        <GageOuterWrapper>
          <GageWrapper 
            onAnimationEnd={timeOut} 
            time_active={time_active}
          />
        </GageOuterWrapper>
      </TimeGageWrapper>
    </>
  );
};
