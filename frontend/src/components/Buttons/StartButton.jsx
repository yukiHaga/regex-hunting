import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { RedRoundButton } from '../shared_style';

const StartButtonWrapper = styled(RedRoundButton)`
  border-style: none;
  margin-top: 45px;
  margin-bottom: 101px;
`;

const StartButtonTextWrapper = styled.div`
  width: 230px;
  height: 58px;
  color: white;
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
