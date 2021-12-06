import React from 'react';
import styled from 'styled-components';

// Images
import TitleImage from '../images/title.png';

// Colors
import { COLORS } from '../style_constants.js';

// BaseLink
import { BaseLink } from './shared_style.js';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${COLORS.MAIN};
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const HeaderTitleImage = styled.img`
  width: 245px;
  height: 42px;
  padding: 5px;
  margin-left: 10px;
  object-fit: contain;
`;

const HeaderNav = styled.nav`
  margin-right: 40px;
`;

const HeaderTitleLink = styled(BaseLink)``;

const HeaderNavLink = styled(BaseLink)`
  height: 52px;
  line-height: 52px;
  display: inline-block;
  color: ${COLORS.SUB};
  margin-left: 20px; 
  :hover {
    opacity: 0.7;
    border-bottom: solid ${COLORS.SUB};
  }
`;

export const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <HeaderTitleLink to={`/`}>
          <HeaderTitleImage src={TitleImage} alt="main logo" />  
        </HeaderTitleLink>
        <HeaderNav>
          <HeaderNavLink to={`/rankings`}>
            ランキング
          </HeaderNavLink>
          <HeaderNavLink to={`/login`}>
            ログイン
          </HeaderNavLink>
          <HeaderNavLink to={`/singup`}> 
            新規会員登録
          </HeaderNavLink>
        </HeaderNav>
      </HeaderWrapper>
    </>
  );
};
