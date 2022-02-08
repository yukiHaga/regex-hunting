import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const PasswordResetRequestButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  opacity: ${(props) => props.disabled ? 0.3 : 1};
  pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
  width: 100%;
  padding-top: 3.2%;
  padding-bottom: 3.2%;
`;

const PasswordResetRequestButtonTextWrapper = styled.div`
  color: white;
  font-style: normal;
  font-size: 1.3em;
  text-align: center;
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
