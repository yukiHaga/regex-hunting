import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const PasswordUpdatesButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  opacity: ${(props) => props.disabled ? 0.3 : 1};
  pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
  width: 100%;
  padding-top: 3.2%;
  padding-bottom: 3.2%;
`;

const PasswordUpdatesButtonTextWrapper = styled.div`
  color: white;
  font-style: normal;
  font-size: 1.3em;
  text-align: center;
`;

export const PasswordUpdatesButton = ({disabled}) => {
  return (
    <>
      <PasswordUpdatesButtonWrapper type="submit" disabled={disabled}>
        <PasswordUpdatesButtonTextWrapper>
          パスワード再設定
        </PasswordUpdatesButtonTextWrapper>
      </PasswordUpdatesButtonWrapper>
    </>
  );
};
