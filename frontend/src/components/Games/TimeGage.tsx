import styled, { keyframes } from 'styled-components';

// Colors
import { COLORS } from '../../style_constants';

// Sounds
import TackleSound from '../../sounds/tackle_25.mp3';

// calculateDamage
import { calculateDamage } from '../../functions/calculateDamage';

import { GameState, SetGameState } from '../../types/containers/games';

const TimeGageWrapper = styled.div`
  background-color: ${COLORS.GAGE_GRAY};
  border-radius: 10px 10px 0 0;
  width: 100%;
  display: flex;
  height: 4.6vh;
  box-sizing: border-box;
  border: 5px solid;
  border-color: ${COLORS.GAGE_GRAY};
`;

const TypeWrapper = styled.div`
  width: 8.5%;
  font-size: 1.2em;
  background-color: ${COLORS.GAGE_GRAY};
  color: ${COLORS.LIGHT_BLACK};
  font-weight: bold;
  text-align: center;
`;

// fuchiue
const Fuchiue = styled.span`
  -webkit-text-stroke: 0;
  position: absolute;
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

const FixWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const GageOuterWrapper = styled.div`
  height: 80%;
  width: 100%;
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 10px;
  border: 1px solid #000;
  box-shadow: inset 1px 1px 3px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 0 rgba(255, 255, 255, 0.12);
`;

// 問題が表示された瞬間、QuestionBlock.jsxによってtimeActiveがtrueになる為、
// アニメーションが動き出す
// clickDescriptionOpenがtrueだと、アニメーションが一時停止する
const GageWrapper = styled.div<{timeActive: boolean, clickDescriptionOpen: boolean, clickMetaOpen: boolean}>`
  height: 100%;
  width: 100%;
  background-color: ${COLORS.YELLOW};
  box-sizing: border-box;
  border: none;
  outline: none;
  animation: ${({
    timeActive,
  }) => timeActive && TimeGageAnime} 30s linear 1;
  animation-play-state: ${({
    clickDescriptionOpen,
    clickMetaOpen
  }) => (clickDescriptionOpen || clickMetaOpen) ? 'paused' : 'running' };
  border-radius: 10px;
  background-image: -webkit-linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  background-image: linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.2) inset,0 2px 10px 0 rgba(255,255,255,.5) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
`;

type TimeGageArg = {
  gameState: GameState;
  setGameState: SetGameState;
  timeActive: boolean;
  monsterAttack: number;
  userDefence: number;
  userHp: number;
  sentenceNum: number;
  clickDescriptionOpen: boolean;
  clickMetaOpen: boolean;
};

export const TimeGage = ({
  gameState,
  setGameState,
  timeActive,
  monsterAttack,
  userDefence,
  userHp,
  sentenceNum,
  clickDescriptionOpen,
  clickMetaOpen
}: TimeGageArg): JSX.Element => {

  // タイムゲージが0になった時に実行される関数
  const timeOut = () => {
    gameState.incorrectQuestions.push({
      question: gameState.questions[0],
      sentenceNum: sentenceNum
    });
    gameState.questions.shift();
    const currentHp = userHp - calculateDamage(monsterAttack, userDefence);
    const audio = new Audio(TackleSound);
    audio.play();
    setGameState((prev) => ({
      ...prev,
      questionJudgement: "incorrect",
      incorrectQuestions: prev.incorrectQuestions,
      questions: prev.questions,
      flashDisplay: true,
      flashTitle: "Bad",
      keyAvailable: false,
      userHp: currentHp
    }));
  };

  return (
    <>
      <TimeGageWrapper>
        <TypeWrapper>
          <Fuchiue>
            TIME
          </Fuchiue>
          TIME
        </TypeWrapper>
        <FixWrapper>
          <GageOuterWrapper>
            <GageWrapper
              onAnimationEnd={timeOut}
              timeActive={timeActive}
              clickDescriptionOpen={clickDescriptionOpen}
              clickMetaOpen={clickMetaOpen}
            />
          </GageOuterWrapper>
        </FixWrapper>
      </TimeGageWrapper>
    </>
  );
};
