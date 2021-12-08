import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const LoginButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  margin-bottom: 15px;
`;

const LoginButtonTextWrapper = styled.div`
  width: 390px;
  height: 50px;
  color: white;
  font-family: YuGothic;
  font-style: normal;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  line-height: 50px;
`;

export const LoginButton = () => {
  return (
    <>
      <LoginButtonWrapper type="submit">
        <LoginButtonTextWrapper>
          ログイン
        </LoginButtonTextWrapper>
      </LoginButtonWrapper>
    </>
  );
};
