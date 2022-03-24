import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// モンスター名を取得する関数
import { getMonsterName } from '../../functions/getMonsterName.ts';

const RestartGameButtonWrapper = styled.div`
  border-style: none;
  border-radius: 3px;
  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    opacity: 0.7;
  }
  cursor: pointer;
  text-decoration: none;
  width: 90%;
  margin: 2%;
`;

const RestartGameButtonTextWrapper = styled.div`
  border-radius: 3px;
  font-style: normal;
  font-size: 1em;
  color: ${COLORS.WHITE};
  text-align: center;
  background-color: ${COLORS.BLUE};
  padding-top: 8%;
  padding-bottom: 8%;
`;

export const RestartGameButton = ({
  difficulty,
  setGameState,
  getGameStart,
  initialState,
}) => {

  // useContext
  const {
    requestUserState: { sessionState },
    dispatch,
    requestUserActionTyps
  } = useContext(UserContext);

  // リスタートを制御する関数
  const handleRestart = (
    difficulty,
    setGameState,
    getGameStart,
    initialState
  ) => {
    dispatch({
      type: requestUserActionTyps.REQUEST_SUCCESS,
      payload: {
        session: sessionState ? true : false,
        play: { play: true }
      }
    });
    getGameStart(difficulty).then((data) => {
      setGameState({
        ...initialState,
        sentence: `${getMonsterName(difficulty)}が現れた！`,
        nextSentence: data.questions["0"].sentence,
        nextSentenceNum: 1,
        nextTargetSentence: data.questions["0"].target_sentence,
        gameManagement: data.game_management,
        questions: data.questions,
        monsterAttack: data.monster.attack,
        monsterDefence: data.monster.defence,
        monsterHp: data.monster.max_hp,
        monsterMaxHp: data.monster.max_hp,
        sampleAnswer: data.questions["0"].sample_answer,
        nextCommentary: data.questions["0"].commentary,
        nextHint: data.questions["0"].hint,
        gameStartTime: performance.now(),
        hasUser: sessionState ?
          true
        :
          false,
        rank: sessionState ?
          data.user.rank
        :
          initialState.rank,
        totalExperience: sessionState ?
          data.user.total_experience
        :
          initialState.totalExperience,
        maximumExperiencePerRank: sessionState ?
          data.user.maximum_experience_per_rank
        :
          initialState.maximumExperiencePerRank,
        temporaryExperience: sessionState ?
          data.user.temporary_experience
        :
          initialState.temporaryExperience,
        prevTemporaryExperience: sessionState ?
          data.user.prev_temporary_experience
        :
          initialState.prevTemporaryExperience
      });
    }).catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
        setGameState({
          ...initialState,
          sentence: ""
        });
      } else {
        throw e;
      }
    });
  }

  return (
    <>
    <RestartGameButtonWrapper
      onClick={() => handleRestart(difficulty, setGameState, getGameStart, initialState)}
    >
        <RestartGameButtonTextWrapper>
          もう一度始める
        </RestartGameButtonTextWrapper>
      </RestartGameButtonWrapper>
    </>
  );
};
