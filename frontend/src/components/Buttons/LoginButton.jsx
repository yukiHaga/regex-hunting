import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const LoginButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  margin-bottom: 3%;
  opacity: ${(props) => props.disabled ? 0.3 : 1};
  pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
  width: 100%;
  padding: 3.3%;
`;

const LoginButtonTextWrapper = styled.div`
  color: white;
  font-style: normal;
  font-size: 1.5em;
  font-weight: 500;
  text-align: center;
`;

export const LoginButton = ({disabled}) => {
  return (
    <>
      <LoginButtonWrapper type="submit" disabled={disabled}>
        <LoginButtonTextWrapper>
          ログイン
        </LoginButtonTextWrapper>
      </LoginButtonWrapper>
    </>
  );
};
