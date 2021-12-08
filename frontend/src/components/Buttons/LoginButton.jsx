import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const LoginButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  margin-top: 45px;
  margin-bottom: 140px;
`;

const LoginButtonTextWrapper = styled.div`
  width: 230px;
  height: 58px;
  color: white;
  font-family: YuGothic;
  font-style: normal;
  font-size: 36px;
  font-weight: 500;
  text-align: center;
`;

export const LoginButton = () => {
  return (
    <>
      <StartButtonWrapper type="button">
        <StartButtonTextWrapper>
          ログイン
        </StartButtonTextWrapper>
      </StartButtonWrapper>
    </>
  );
};
