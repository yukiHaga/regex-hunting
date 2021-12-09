import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import { BaseLink } from '../shared_style';
import { RoundButton  } from '../shared_style';

const OAuthLoginButtonWrapper = styled(RoundButton)`
  margin-bottom: 8px;
  background-color: ${(props) => props.backgroundcolor || COLORS.BLUE};
  width: 400px;
  height: 50px;
  border-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OAuthLoginButtonIconWrapper = styled.div`
  margin-right: 5px;
`;

const OAuthLoginButtonTextWrapper = styled(BaseLink)`
  display: block;
  color: white;
  font-family: YuGothic;
  font-style: normal;
  font-size: 20px;
  font-weight: 500;
`;

export const OAuthLoginButton = ({url, color, icon, type}) => {
  return (
    <>
      <OAuthLoginButtonWrapper backgroundcolor={color}>
        <OAuthLoginButtonIconWrapper> 
          {icon}
        </OAuthLoginButtonIconWrapper>
        <OAuthLoginButtonTextWrapper to={url}>
          {`${type}で続ける`}
        </OAuthLoginButtonTextWrapper>
      </OAuthLoginButtonWrapper>
    </>
  );
};