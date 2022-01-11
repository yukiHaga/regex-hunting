import React from 'react';
import styled, { keyframes } from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Sounds
import TackleSound from '../../sounds/tackle.mp3';

// calculateDamage 
import { calculateDamage } from '../../functions/calculateDamage.js';

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

// 問題が表示された瞬間、QuestionBlock.jsxによってtime_activeがtrueになるので、
// アニメーションが動き出す
// click_description_openがtrueだと、アニメーションが一時停止する
const GageWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${COLORS.YELLOW};
  box-sizing: border-box;
  border: none;
  outline: none;
  animation: ${({
    time_active,
  }) => time_active && TimeGageAnime} 30s linear 1;
  animation-play-state: ${({
    click_description_open,
    click_meta_open
  }) => (click_description_open || click_meta_open) ? 'paused' : 'running' };
`;

const GageOuterWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const TimeGage = ({
  gameState,
  setGameState,
  time_active,
  monster_attack,
  user_defence,
  user_hp,
  sentence_num,
  click_description_open,
  click_meta_open
}) => {

  // タイムゲージが0になった時に実行される関数
  const timeOut = () => {
    gameState.incorrect_questions.push({
      question: gameState.questions[0],
      sentence_num: sentence_num
    });
    gameState.questions.shift();
    const current_hp = user_hp - calculateDamage(monster_attack, user_defence);
    const audio = new Audio(TackleSound);
    audio.play();
    setGameState((prev) => ({
      ...prev,
      question_judgement: "incorrect",
      incorrect_questions: prev.incorrect_questions,
      questions: prev.questions,
      flash_display: true,
      flash_title: "Bad",
      commentary: prev.next_commentary,
      next_commentary: prev?.questions["0"]?.commentary || "no_next_commentary",
      key_available: false,
      user_hp: current_hp
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
            click_description_open={click_description_open}
            click_meta_open={click_meta_open}
          />
        </GageOuterWrapper>
      </TimeGageWrapper>
    </>
  );
};
