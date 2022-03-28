import React, { Fragment } from 'react';
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

// PasswordUpdatesButtonの引数の型をインポートしてくる
import { Disabled } from '../../types/components/buttons';

const PasswordUpdatesButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  opacity: ${({ disabled }) => disabled ? 0.3 : 1};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
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

export const PasswordUpdatesButton = ({disabled}: Disabled): JSX.Element => {
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
