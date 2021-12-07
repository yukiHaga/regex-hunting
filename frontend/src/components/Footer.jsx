import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../style_constants.js';

// BaseLink
import { BaseLink } from './shared_style.js';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: start;
  background-color: ${COLORS.BROWN};
  width: 100%;
  z-index: 1;
`;

const FooterNav = styled.nav`
  margin-left: 20px;
`;

const FooterNavLink = styled(BaseLink)`
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

export const Footer = () => {
  return (
    <>
      <FooterWrapper>
        <FooterNav>
          <FooterNavLink to={`/policy`}>
            利用規約
          </FooterNavLink>
          <FooterNavLink to={`/privacy-policy`}>
            プライバシーポリシー
          </FooterNavLink>
        </FooterNav>
      </FooterWrapper>
    </>
  );
};
