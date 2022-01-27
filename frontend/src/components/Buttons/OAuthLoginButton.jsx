import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import { AnchorRoundButton } from '../shared_style';

const OAuthLoginButtonWrapper = styled(AnchorRoundButton)`
  margin: 0 auto;
  margin-bottom: 2%;
  background-color: ${(props) => props.backgroundcolor || COLORS.BLUE};
  width: 77%;
  border-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: YuGothic;
  font-style: normal;
  font-size: 1.2em;
  font-weight: 500;
  text-decoration: none;
  padding: 1%;
`;

const OAuthLoginButtonIconWrapper = styled.div`
  margin-right: 1%;
`;

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
