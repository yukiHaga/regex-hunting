import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

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
  initialState
}) => {

  // リスタートを制御する関数
  const handleRestart = (
    difficulty, 
    setGameState, 
    getGameStart,
    initialState
  ) => {
    getGameStart(difficulty).then((data) => {
      setGameState({
        ...initialState,
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
        game_result: data.game_management.game_result
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
