import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const SignUpButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  margin-bottom: 15px;
`;

const SignUpButtonTextWrapper = styled.div`
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

export const SignUpButton = () => {
  return (
    <>
      <SignUpButtonWrapper type="submit">
        <SignUpButtonTextWrapper>
          新規登録
        </SignUpButtonTextWrapper>
      </SignUpButtonWrapper>
    </>
  );
};
