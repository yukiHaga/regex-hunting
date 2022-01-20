import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// BaseLink
import { BaseLink } from '../shared_style.js';

const FooterWrapper = styled.div`
  height: 55px;
  display: flex;
  justify-content: start;
  background-color: ${COLORS.BROWN};
  width: 100%;
  background-image: -webkit-linear-gradient(rgba(255,255,255,.3) 0%,transparent 30%,transparent 30%,rgba(0,0,0,.1) 100%);
  background-image:         linear-gradient(rgba(255,255,255,.3) 0%,transparent 30%,transparent 30%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.1) inset,0 2px 10px 0 rgba(255,255,255,.2) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
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
