import React, { Fragment } from 'react';
import styled from 'styled-components';

// フラッシュメッセージ関係のコンポーネント;
import Slide from '@mui/material/Slide';

// Colors
import { COLORS } from '../../style_constants.js';

const CustomSlide = styled(Slide)`
`;

const GoodFlashMessageWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const GoodMessageTitle = styled.div`
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 32px;
  color: ${COLORS.MAIN};
  padding-top: 5px;
  padding-bottom: 5px;
`;

const GoodMessage = styled.div`
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

export const GoodFlashMessage = ({
  flash_display,
  commentary
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
        <GoodFlashMessageWrapper>
          <GoodMessage severity="success">
            <GoodMessageTitle>
              Good
            </GoodMessageTitle>
            {commentary}
          </GoodMessage>
        </GoodFlashMessageWrapper>
      </CustomSlide>
    </>
  );
};
