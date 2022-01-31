import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js';

const TitleLineWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ButtonWrapper = styled.div`
  font-size: 2.0em;
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
  font-size: 1.7em;
  text-align: center;
`;

export const SecondSelectBox = ({
  difficulty_title,
  setMyPageState
}) => {

  // 初級のデータを表示する関数
  const handleElementary = () => {
    setMyPageState((prev) => ({
      ...prev,
      difficulty_title: "初級編"
    }));
  };

  // 中級のデータを表示する関数
  const handleIntermediate = () => {
    setMyPageState((prev) => ({
      ...prev,
      difficulty_title: "中級編"
    }));
  };

  // 上級のデータを表示する関数
  const handleAdvanced = () => {
    setMyPageState((prev) => ({
      ...prev,
      difficulty_title: "上級編"
    }));
  };

  // 左矢印のリンクを制御する関数
  // difficulty_titleは初め初級が入る
  // そのため、defaultは上級の関数が実行される
  const handleLeftArrow = (difficulty_title) => {
    switch (difficulty_title){
      case '中級編':
        handleElementary();
        break;
      case '上級編':
        handleIntermediate(); 
        break;
      default:
        handleAdvanced();
    }
  };

  // 右矢印のリンクを制御する関数
  // difficulty_titleは初め初級が入る
  // そのため、defaultは中級の関数が実行される
  const handleRightArrow = (difficulty_title) => {
    switch (difficulty_title){
      case '中級編':
        handleAdvanced();
        break;
      case '上級編':
        handleElementary();
        break;
      default:
        handleIntermediate(); 
    }
  };

  return (
    <TitleLineWrapper>
      <ButtonWrapper 
      >
        <ArrowLeftIcon
          fontSize='inherit' 
          sx={{ color: `${COLORS.BLACK}` }}
          onClick={() => handleLeftArrow(difficulty_title)}
        />
      </ButtonWrapper>
      <SecondSelectBoxSentenceWrapper>
        {difficulty_title}
      </SecondSelectBoxSentenceWrapper>
      <ButtonWrapper
      >
        <ArrowRightIcon
          fontSize='inherit' 
          sx={{ color: `${COLORS.BLACK}` }}
          onClick={() => handleRightArrow(difficulty_title)}
        />
      </ButtonWrapper>
    </TitleLineWrapper>
  );
}
