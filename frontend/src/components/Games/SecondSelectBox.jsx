import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import IconButton from '@mui/material/IconButton';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js';

import { WIDTH } from '../../style_constants.js';

const TitleLineWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const SecondSelectBoxSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 1.6em;
  text-align: center;
  padding-top: 1%;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 1.4em;
    padding-top: 1.5%;
  }
`;

export const SecondSelectBox = ({
  difficulty_month_title,
  setMyPageState,
  this_month
}) => {

  // 初級のデータを表示する関数
  const handleElementary = () => {
    setMyPageState((prev) => ({
      ...prev,
      selected_total_time: prev.total_time_per_difficulty.elementary,
      selected_game_clear_count: prev.game_clear_count_per_difficulty.elementary,
      selected_fast_time: prev.fast_time_per_difficulty.elementary,
      difficulty_month_title: `初級編(${this_month}月)`
    }));
  };

  // 中級のデータを表示する関数
  const handleIntermediate = () => {
    setMyPageState((prev) => ({
      ...prev,
      selected_total_time: prev.total_time_per_difficulty.intermediate,
      selected_game_clear_count: prev.game_clear_count_per_difficulty.intermediate,
      selected_fast_time: prev.fast_time_per_difficulty.intermediate,
      difficulty_month_title: `中級編(${this_month}月)`
    }));
  };

  // 上級のデータを表示する関数
  const handleAdvanced = () => {
    setMyPageState((prev) => ({
      ...prev,
      selected_total_time: prev.total_time_per_difficulty.advanced,
      selected_game_clear_count: prev.game_clear_count_per_difficulty.advanced,
      selected_fast_time: prev.fast_time_per_difficulty.advanced,
      difficulty_month_title: `上級編(${this_month}月)`
    }));
  };

  // 左矢印のリンクを制御する関数
  // difficulty_month_titleは初め初級が入る
  // そのため、defaultは上級の関数が実行される
  const handleLeftArrow = (difficulty_month_title) => {
    switch (difficulty_month_title){
      case `中級編(${this_month}月)`:
        handleElementary();
        break;
      case `上級編(${this_month}月)`:
        handleIntermediate(); 
        break;
      default:
        handleAdvanced();
    }
  };

  // 右矢印のリンクを制御する関数
  // difficulty_month_titleは初め初級が入る
  // そのため、defaultは中級の関数が実行される
  const handleRightArrow = (difficulty_month_title) => {
    switch (difficulty_month_title){
      case `中級編(${this_month}月)`:
        handleAdvanced();
        break;
      case `上級編(${this_month}月)`:
        handleElementary();
        break;
      default:
        handleIntermediate(); 
    }
  };

  return (
    <TitleLineWrapper>
      <IconButton
        sx={{
          fontSize: '2.5em'
        }}
      >
        <ArrowLeftIcon
          fontSize='inherit' 
          sx={{ color: `${COLORS.BLACK}` }}
          onClick={() => handleLeftArrow(difficulty_month_title)}
        />
      </IconButton>
      <SecondSelectBoxSentenceWrapper>
        {difficulty_month_title}
      </SecondSelectBoxSentenceWrapper>
      <IconButton
        sx={{
          fontSize: '2.5em'
        }}
      >
        <ArrowRightIcon
          fontSize='inherit' 
          sx={{ color: `${COLORS.BLACK}` }}
          onClick={() => handleRightArrow(difficulty_month_title)}
        />
      </IconButton>
    </TitleLineWrapper>
  );
}
