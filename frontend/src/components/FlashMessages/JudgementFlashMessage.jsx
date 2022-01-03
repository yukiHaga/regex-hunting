import React, { Fragment } from 'react';
import styled from 'styled-components';

// フラッシュメッセージ関係のコンポーネント;
import Slide from '@mui/material/Slide';

// Colors
import { COLORS } from '../../style_constants.js';

const CustomSlide = styled(Slide)`
`;

const JudgementFlashMessageWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

// タイトルカラーを取り扱う関数
const handleTitleColorType = (flash_title) => {
  switch (flash_title) {
    case "Good":
      return COLORS.MAIN;
    case "Bad":
      return COLORS.RED;
    default:
      return COLORS.RED;
  }
};

const JudgementMessageTitle = styled.div`
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 32px;
  color: ${(props) => handleTitleColorType(props.flash_title)};
  padding-top: 5px;
  padding-bottom: 5px;
`;

const JudgementMessage = styled.div`
  width: 190px;
  height: 150px;
  pointerEvents: 'none';
  background-color: ${COLORS.SUB};
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-style: normal;
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 5px;
`;

export const JudgementFlashMessage = ({
  flash_display,
  commentary,
  flash_title
}) => {

  // addEndListener={() => (setTimeout(() => (navigate(url)), 2500))}
  return (
    <>
      <CustomSlide 
        direction="left" 
        in={flash_display} 
        timeout={{ enter: 1000, exit: 1000 }} 
        mountOnEnter 
        unmountOnExit
      >
        <JudgementFlashMessageWrapper>
          <JudgementMessage severity="success">
            <JudgementMessageTitle flash_title={flash_title}>
              {flash_title}
            </JudgementMessageTitle>
            {commentary}
          </JudgementMessage>
        </JudgementFlashMessageWrapper>
      </CustomSlide>
    </>
  );
};
