import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const SignUpButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  margin-bottom: 3%;
  opacity: ${({disabled}) => disabled ? 0.3 : 1};
  pointer-events: ${({disabled}) => disabled ? 'none' : 'auto'};
  width: 100%;
  padding: 3.3%;
`;

// ここのwidthをpxから変えるとレイアウトが崩れるので、pxにした
const SignUpButtonTextWrapper = styled.div`
  color: white;
  font-style: normal;
  font-size: 1.5em;
  font-weight: 500;
  text-align: center;
`;

export const SignUpButton = ({disabled}) => {
  return (
    <>
      <SignUpButtonWrapper type="submit" disabled={disabled}>
        <SignUpButtonTextWrapper>
          新規登録
        </SignUpButtonTextWrapper>
      </SignUpButtonWrapper>
    </>
  );
};
