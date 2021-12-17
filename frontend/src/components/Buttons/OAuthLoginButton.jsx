import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import { BaseLink } from '../shared_style';
import { RoundButton  } from '../shared_style';
import { AnchorRoundButton } from '../shared_style';

const OAuthLoginButtonWrapper = styled(AnchorRoundButton)`
  margin-bottom: 8px;
  background-color: ${(props) => props.backgroundcolor || COLORS.BLUE};
  width: 400px;
  height: 50px;
  border-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: YuGothic;
  font-style: normal;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
`;

const OAuthLoginButtonIconWrapper = styled.div`
  margin-right: 5px;
`;

/*
const OAuthLoginButtonTextWrapper = styled(BaseLink)`
  display: block;
  color: white;
  font-family: YuGothic;
  font-style: normal;
  font-size: 20px;
  font-weight: 500;
`;
*/

export const OAuthLoginButton = ({url, color, icon, type}) => {
  return (
    <>
      <OAuthLoginButtonWrapper href={url} backgroundcolor={color}>
        <OAuthLoginButtonIconWrapper> 
          {icon}
        </OAuthLoginButtonIconWrapper>
        {`${type}で続ける`}
      </OAuthLoginButtonWrapper>
    </>
  );
};
