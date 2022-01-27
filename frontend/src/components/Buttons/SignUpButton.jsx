import React, { Fragment } from 'react'; 
import styled from 'styled-components';

import { BlueRoundButton } from '../shared_style';

const SignUpButtonWrapper = styled(BlueRoundButton)`
  border-style: none;
  margin-bottom: 3%;
  opacity: ${(props) => props.disabled ? 0.3 : 1};
  pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
  width: 77%;
  padding: 2.4%;
`;

// ここのwidthをpxから変えるとレイアウトが崩れるので、pxにした
const SignUpButtonTextWrapper = styled.div`
  color: white;
  font-family: YuGothic;
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
