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
  background-image: -webkit-linear-gradient(rgba(255,255,255,.3) 0%,transparent 30%,transparent 30%,rgba(0,0,0,.1) 100%);
  background-image:         linear-gradient(rgba(255,255,255,.3) 0%,transparent 30%,transparent 30%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.1) inset,0 2px 10px 0 rgba(255,255,255,.2) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
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


export const GameFooter = ({
  setGameState
}) => {

  // game_description_openがtrue, click_description_opneがtrueの時、
  // スライドを見る用の説明モーダルが開く
  const handleGameDescriptionDialog = () => {
    setGameState((prev) => ({
      ...prev,  
      game_description_open: true,
      click_description_open: true
    }));
  }

  // click_meta_openがtrueの時、
  // メタ文字一覧のモーダルが開く
  const handleMetaDialog = () => {
    setGameState((prev) => ({
      ...prev,  
      click_meta_open: true
    }));
  }

  return (
    <>
      <FooterWrapper>
        <FooterNav>
          <FooterNavFakeLink
            onClick={handleGameDescriptionDialog}
          >
            スライドを見る
          </FooterNavFakeLink>
          <FooterNavFakeLink 
            onClick={handleMetaDialog}
          >
            メタ文字一覧
          </FooterNavFakeLink>
        </FooterNav>
      </FooterWrapper>
    </>
  );
};
