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
  difficultyMonthTitle,
  setMyPageState,
  thisMonth
}) => {

  // 初級のデータを表示する関数
  const handleElementary = () => {
    setMyPageState((prev) => ({
      ...prev,
      selectedTotalTime: prev.totalTimePerDifficulty.elementary,
      selectedGameClearCount: prev.gameClearCountPerDifficulty.elementary,
      selectedFastTime: prev.fastTimePerDifficulty.elementary,
      difficultyMonthTitle: `初級編(${thisMonth}月)`
    }));
  };

  // 中級のデータを表示する関数
  const handleIntermediate = () => {
    setMyPageState((prev) => ({
      ...prev,
      selectedTotalTime: prev.totalTimePerDifficulty.intermediate,
      selectedGameClearCount: prev.gameClearCountPerDifficulty.intermediate,
      selectedFastTime: prev.fastTimePerDifficulty.intermediate,
      difficultyMonthTitle: `中級編(${thisMonth}月)`
    }));
  };

  // 上級のデータを表示する関数
  const handleAdvanced = () => {
    setMyPageState((prev) => ({
      ...prev,
      selectedTotalTime: prev.totalTimePerDifficulty.advanced,
      selectedGameClearCount: prev.gameClearCountPerDifficulty.advanced,
      selectedFastTime: prev.fastTimePerDifficulty.advanced,
      difficultyMonthTitle: `上級編(${thisMonth}月)`
    }));
  };

  // 左矢印のリンクを制御する関数
  // difficultyMonthTitleは初め初級が入る
  // そのため、defaultは上級の関数が実行される
  const handleLeftArrow = (difficultyMonthTitle) => {
    switch (difficultyMonthTitle){
      case `中級編(${thisMonth}月)`:
        handleElementary();
        break;
      case `上級編(${thisMonth}月)`:
        handleIntermediate(); 
        break;
      default:
        handleAdvanced();
    }
  };

  // 右矢印のリンクを制御する関数
  // difficultyMonthTitleは初め初級が入る
  // そのため、defaultは中級の関数が実行される
  const handleRightArrow = (difficultyMonthTitle) => {
    switch (difficultyMonthTitle){
      case `中級編(${thisMonth}月)`:
        handleAdvanced();
        break;
      case `上級編(${thisMonth}月)`:
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
          onClick={() => handleLeftArrow(difficultyMonthTitle)}
        />
      </IconButton>
      <SecondSelectBoxSentenceWrapper>
        {difficultyMonthTitle}
      </SecondSelectBoxSentenceWrapper>
      <IconButton
        sx={{
          fontSize: '2.5em'
        }}
      >
        <ArrowRightIcon
          fontSize='inherit' 
          sx={{ color: `${COLORS.BLACK}` }}
          onClick={() => handleRightArrow(difficultyMonthTitle)}
        />
      </IconButton>
    </TitleLineWrapper>
  );
}
