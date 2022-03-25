import React, { Fragment } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import { AnchorRoundButton } from '../shared_style';

// CustomIcon
import { ColoredGoogleIcon } from '../Icons/CustomIcon';
import { ColoredGitHubIcon } from '../Icons/CustomIcon';

const OAuthLoginButtonWrapper = styled(AnchorRoundButton)`
  margin: 0 auto;
  margin-bottom: 2%;
  background-color: ${({ color }) => color || COLORS.BLUE};
  width: 100%;
  border-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-style: normal;
  font-size: 1.2em;
  font-weight: 500;
  text-decoration: none;
  padding: 1.5%;
`;

const OAuthLoginButtonIconWrapper = styled.div`
  margin-right: 1%;
`;

type OAuthLoginButtonArg = {
  url: string,
  color: string,
  type: string
};

export const OAuthLoginButton = ({url, color, type}: OAuthLoginButtonArg): JSX.Element => {
  return (
    <>
      <OAuthLoginButtonWrapper href={url} color={color}>
        <OAuthLoginButtonIconWrapper>
          {
            type === "Google" && <ColoredGoogleIcon fontSize="large" />
          }
          {
            type === "GitHub" && <ColoredGitHubIcon fontSize="large" />
          }
        </OAuthLoginButtonIconWrapper>
        {`${type}で続ける`}
      </OAuthLoginButtonWrapper>
    </>
  );
};
