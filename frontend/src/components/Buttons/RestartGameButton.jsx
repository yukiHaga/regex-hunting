import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BaseLink } from '../shared_style';

// Colors
import { COLORS } from '../../style_constants.js';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

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
  getGameStart
}) => {

  // モンスター名を取得する関数
  const getMonsterName = (difficulty) => {
    let monsterName;
    switch (difficulty){
      case 'elementary':
        monsterName = 'スクータムの群れ';
        break;
      case 'intermediate':
        monsterName = 'カスアリウスの群れ';
        break;
      case 'advanced':
        monsterName = 'オルファラ・ラパクス';
        break;
      default:
        console.log('エラーが起きました');
    }
    return monsterName;
  };

  // リスタートを制御する関数
  const handleRestart = (difficulty, setGameState, getGameStart) => {
    getGameStart(difficulty).then((data) => {
      setGameState({
        sentence: `${getMonsterName(difficulty)}が現れた！`,
        next_sentence: data.questions["0"].sentence,
        sentence_num: "",
        next_sentence_num: 1,
        target_sentence: "",
        next_target_sentence: data.questions["0"].target_sentence,
        game_management: data.game_management,
        questions: data.questions,
        monster_attack: data.monster.attack,
        monster_defence: data.monster.defence,
        monster_hp: data.monster.max_hp,
        monster_max_hp: data.monster.max_hp,
        correct_questions: [],
        incorrect_questions: [],
        sample_answer: data.questions["0"].sample_answer,
        match_array: [],
        commentary: "",
        next_commentary: data.questions["0"].commentary,
        question_finish: false,
        flash_display: false,
        input_regex_object: {},
        key_available: false,
        game_result: data.game_management.game_result
      }); 
    }).catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
        setGameState({
          game_management: {},
          questions: [],
          correct_questions: [],
          incorrect_questions: [],
          sentence: "",
          next_sentence: "",
          sentence_num: "",
          next_sentence_num: "",
          target_sentence: "",
          next_target_sentence: "",
          sample_answer: [],
          match_array: [],
          question_finish: false,
          flash_display: false,
          monster_attack: {},
          monster_defence: {},
          monster_hp: 0,
          monster_max_hp: 0,
          commentary: "",
          next_commentary: "",
          input_regex_object: {},
          key_available: false,
          game_result: ""
        }); 
      } else {
        throw e;
      }
    });
  }

  return (
    <>
    <RestartGameButtonWrapper 
      onClick={() => handleRestart(difficulty, setGameState, getGameStart)}
    >
        <RestartGameButtonTextWrapper>
          もう一度始める
        </RestartGameButtonTextWrapper>
      </RestartGameButtonWrapper>
    </>
  );
};
