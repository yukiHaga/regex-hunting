import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import { ColoredTwitterIcon } from '../Icons/CustomIcon.js';

const ResultShareButtonWrapper = styled.a`
  margin-top: 30px;
  border-style: none;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: 0.3s;
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    opacity: 0.7;
  }
  cursor: pointer;
  text-decoration: none;
`;

const ResultShareButtonTextWrapper = styled.div`
  width: 150px;
  height: 36px;
  border-radius: 3px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 36px;
  color: ${COLORS.LIGHT_BLUE};
  text-align: center;
  background-color: ${COLORS.WHITE};
  padding-top: 5px;
  padding-bottom: 5px;
  border: 2px solid ${COLORS.LIGHT_BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResultShareButton = () => {
  return (
    <>
    <ResultShareButtonWrapper 
      href="https://twitter.com/share?url=http://localhost:3001/&text=初級編をクリアしました！&hashtags=RegexHunting,正規表現,ゲーム"
      target="_blank" 
      rel="noopener noreferrer"
    >
        <ResultShareButtonTextWrapper>
          <ColoredTwitterIcon fontSize="medium" />
          シェアする
        </ResultShareButtonTextWrapper>
      </ResultShareButtonWrapper>
    </>
  );
};
