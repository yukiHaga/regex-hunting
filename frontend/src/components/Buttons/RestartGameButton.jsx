import React, { Fragment, useContext } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// モンスター名を取得する関数
import { getMonsterName } from '../../functions/getMonsterName.js';

const RestartGameButtonWrapper = styled.div`
  margin-top: 30px;
  border-style: none;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: 0.3s;
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    opacity: 0.7;
  }
  cursor: pointer;
  text-decoration: none;
`;

const RestartGameButtonTextWrapper = styled.div`
  width: 150px;
  height: 40px;
  border-radius: 3px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 40px;
  color: ${COLORS.WHITE};
  text-align: center;
  background-color: ${COLORS.BLUE};
  padding-top: 5px;
  padding-bottom: 5px;
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
        next_sentence: data.questions["0"].sentence,
        next_sentence_num: 1,
        next_target_sentence: data.questions["0"].target_sentence,
        game_management: data.game_management,
        questions: data.questions,
        monster_attack: data.monster.attack,
        monster_defence: data.monster.defence,
        monster_hp: data.monster.max_hp,
        monster_max_hp: data.monster.max_hp,
        sample_answer: data.questions["0"].sample_answer,
        next_commentary: data.questions["0"].commentary,
        next_hint: data.questions["0"].hint,
        game_start_time: performance.now(),
        has_user: sessionState ? 
          true
        : 
          false,
        rank: sessionState ?
          data.user.rank 
        : 
          initialState.rank,
        total_experience: sessionState ?
          data.user.total_experience 
        : 
          initialState.total_experience, 
        maximum_experience_per_rank: sessionState ?
          data.user.maximum_experience_per_rank 
        : 
          initialState.maximum_experience_per_rank, 
        temporary_experience: sessionState ?
          data.user.temporary_experience
        :
          initialState.temporary_experience,
        prev_temporary_experience: sessionState ?
          data.user.prev_temporary_experience
        :
          initialState.prev_temporary_experience
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
