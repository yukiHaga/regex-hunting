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

const TitleLineWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ButtonWrapper = styled.div`
  font-size: 3.0em;
  height: 1%;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :focus {
    outline: 0;
  }
`;

const SecondSelectBoxSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 1.6em;
  text-align: center;
  padding-top: 1%;
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
      difficulty_month_title: `初級編(${this_month}月)`
    }));
  };

  // 中級のデータを表示する関数
  const handleIntermediate = () => {
    setMyPageState((prev) => ({
      ...prev,
      difficulty_month_title: `中級編(${this_month}月)`
    }));
  };

  // 上級のデータを表示する関数
  const handleAdvanced = () => {
    setMyPageState((prev) => ({
      ...prev,
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
          fontSize: '3.0em'
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
          fontSize: '3.0em'
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
