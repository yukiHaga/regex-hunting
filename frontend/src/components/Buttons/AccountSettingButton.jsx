import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const AccountSettingButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  opacity: ${(props) => props.disabled ? 0.3 : 1};
  pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3%;
  padding-bottom: 3%;
`;

const AccountSettingButtonTextWrapper = styled.div`
  color: white;
  font-style: normal;
  font-size: 1.3em;
`;

export const AccountSettingButton = ({disabled}) => {
  return (
    <>
      <AccountSettingButtonWrapper type="submit" disabled={disabled}>
        <AccountSettingButtonTextWrapper>
          更新
        </AccountSettingButtonTextWrapper>
      </AccountSettingButtonWrapper>
    </>
  );
};
