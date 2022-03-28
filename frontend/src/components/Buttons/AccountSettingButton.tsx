import React, { Fragment } from 'react';
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

// AccountSettingButtonの引数の型をインポートしてくる
import { Disabled } from '../../types/components/buttons';

const AccountSettingButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  opacity: ${({ disabled }) => disabled ? 0.3 : 1};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
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

export const AccountSettingButton = ({disabled}: Disabled): JSX.Element => {
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
