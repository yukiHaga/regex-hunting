import React from 'react';
import styled from 'styled-components';

// Images
import TitleImage from '../images/title.png';

// Colors
import { COLORS } from '../style_constants.js';

// Link
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${COLORS.MAIN};
`;

const HeaderTitleImage = styled.img`
  width: 245px;
  height: 42px;
  padding: 5px;
  margin-left: 10px;
  object-fit: contain;
`;

const Nav = styled.nav`
  height: 52px;
  font-weight: bold;
  line-height: 52px;
  margin-right: 40px;
`;

const HeaderLink = styled(Link)`
  margin-left: 20px; 
  text-decoration: none;
  color: ${COLORS.SUB};
`;

export const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <HeaderTitleImage src={TitleImage} alt="main logo" />  
        <Nav>
          <HeaderLink to={`/rankings`}>
            ランキング
          </HeaderLink>
          <HeaderLink to={`/login`}>
            ログイン
          </HeaderLink>
          <HeaderLink to={`/singup`}> 
            新規会員登録
          </HeaderLink>
        </Nav>
      </HeaderWrapper>
    </>
  );
};
