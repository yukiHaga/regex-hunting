import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Button
import { RedRoundButton } from '../shared_style';

// Responsive
import { WIDTH } from '../../style_constants.js';

const StartButtonWrapper = styled(RedRoundButton)`
  border-style: none;
  margin-top: 3%;
  margin-bottom: 7%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: 0.3s;
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
  }
  width: 17%;
  @media (max-width: ${WIDTH.MOBILE}) {
    width: 50%;
    margin-top: 10%;
    margin-bottom: 20%;
  }
  padding-bottom: 0.1%;
`;

const StartButtonTextWrapper = styled.div`
  color: ${COLORS.SUB};
  font-family: 'Avenir';
  font-style: normal;
  font-size: 2.9em;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 2.0em;
  }
  font-weight: 500;
  text-align: center;
  padding: 2%;
  vertical-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
