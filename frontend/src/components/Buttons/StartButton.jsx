import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Button
import { RedRoundButton } from '../shared_style';

const StartButtonWrapper = styled(RedRoundButton)`
  border-style: none;
  margin-top: 45px;
  margin-bottom: 91px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: 0.3s;
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
  }
`;

const StartButtonTextWrapper = styled.div`
  width: 230px;
  height: 58px;
  color: ${COLORS.SUB};
  font-family: YuGothic;
  font-style: normal;
  font-size: 36px;
  font-weight: 500;
  text-align: center;
`;

export const StartButton = () => {
  return (
    <>
      <StartButtonWrapper type="button">
        <StartButtonTextWrapper>
          start
        </StartButtonTextWrapper>
      </StartButtonWrapper>
    </>
  );
};
