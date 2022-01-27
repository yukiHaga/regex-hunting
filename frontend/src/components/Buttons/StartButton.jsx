import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Button
import { RedRoundButton } from '../shared_style';

const StartButtonWrapper = styled(RedRoundButton)`
  border-style: none;
  margin-top: 4%;
  margin-bottom: 7%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: 0.3s;
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
  }
  width: 17%;
  @media (max-width: 414px) {
    width: 50%;
    margin-top: 10%;
    margin-bottom: 20%;
  }
`;

const StartButtonTextWrapper = styled.div`
  color: ${COLORS.SUB};
  font-family: YuGothic;
  font-style: normal;
  font-size: 2.7em;
  @media (max-width: 414px) {
    font-size: 2.0em;
  }
  font-weight: 500;
  text-align: center;
  padding-bottom: 1%;
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
