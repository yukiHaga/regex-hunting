import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const PasswordUpdatesButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  opacity: ${(props) => props.disabled ? 0.3 : 1};
  pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
`;

const PasswordUpdatesButtonTextWrapper = styled.div`
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
