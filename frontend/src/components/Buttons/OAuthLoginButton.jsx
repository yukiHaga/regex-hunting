import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import { BaseLink } from '../shared_style';

const OAuthLoginButtonWrapper = styled(BaseLink)`
  border-style: none;
  margin-top: 45px;
  margin-bottom: 140px;
  border-radius: 3px;
  background-color: ${(props) => props.backGroundColor || COLORS.BLUE};
`;

const OAuthLoginButtonTextWrapper = styled.div`
  width: 390px;
  height: 50px;
  color: white;
  font-family: YuGothic;
  font-style: normal;
  font-size: 36px;
  font-weight: 500;
  text-align: center;
`;

export const OAuthLoginButton = ({url, color, icon, type}) => {
  return (
    <>
      <OAuthLoginButtonWrapper to={url} backGroundColor={color}>
        {icon}
        <OAuthLoginButtonTextWrapper>
          {`${type}で続ける`}
        </OAuthLoginButtonTextWrapper>
      </OAuthLoginButtonWrapper>
    </>
  );
};
