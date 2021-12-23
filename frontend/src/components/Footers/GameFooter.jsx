import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// BaseLink
import { FakeLink } from '../shared_style.js';

const FooterWrapper = styled.div`
  height: 55px;
  display: flex;
  justify-content: start;
  background-color: ${COLORS.BROWN};
  width: 100%;
`;

const FooterNav = styled.nav`
  margin-left: 20px;
`;

const FooterNavFakeLink = styled(FakeLink)`
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


export const GameFooter = () => {
  return (
    <>
      <FooterWrapper>
        <FooterNav>
          <FooterNavFakeLink>
            スライドを見る
          </FooterNavFakeLink>
        </FooterNav>
      </FooterWrapper>
    </>
  );
};