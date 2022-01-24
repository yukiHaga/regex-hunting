import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const PasswordResetRequestButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  opacity: ${(props) => props.disabled ? 0.3 : 1};
  pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
`;

const PasswordResetRequestButtonTextWrapper = styled.div`
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

export const PasswordResetRequestButton = ({disabled}) => {
  return (
    <>
      <PasswordResetRequestButtonWrapper type="submit" disabled={disabled}>
        <PasswordResetRequestButtonTextWrapper>
          送信
        </PasswordResetRequestButtonTextWrapper>
      </PasswordResetRequestButtonWrapper>
    </>
  );
};
