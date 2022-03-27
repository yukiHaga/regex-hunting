import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// setGameStateの型
import { SetGameState } from '../../types/containers/games';

const FooterWrapper = styled.div`
  background-color: ${COLORS.BROWN};
  height: 8.7vh;
  display: flex;
  align-items: center;
`;

const ModalLinkBlock = styled.div`
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  text-decoration: none;
  color: ${COLORS.WHITE};
  font-size: 0.9em;
  margin-left: 6%;
  width: 9vw;
`;

// GameFooterの引数の型
type GameFooterArg = {
  setGameState: SetGameState;
};

export const GameFooter = ({
  setGameState,
}: GameFooterArg): JSX.Element => {

  // gameDescriptionOpenがtrue, clickDescriptionOpenがtrueの時、
  // スライドを見る用の説明モーダルが開く
  const handleGameDescriptionDialog = () => {
    setGameState((prev) => ({
      ...prev,
      gameDescriptionOpen: true,
      clickDescriptionOpen: true
    }));
  }

  // clickMetaOpenがtrueの時、
  // メタ文字一覧のモーダルが開く
  const handleMetaDialog = () => {
    setGameState((prev) => ({
      ...prev,
      clickMetaOpen: true
    }));
  }

  return (
    <>
      <FooterWrapper>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexDirection: { xs: 'column', md: 'row' }, display: 'flex' }}>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
                <ModalLinkBlock
                  onClick={handleGameDescriptionDialog}
                >
                  スライドを見る
                </ModalLinkBlock>
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
                <ModalLinkBlock
                  onClick={handleMetaDialog}
                >
                  特殊文字一覧
                </ModalLinkBlock>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </FooterWrapper>
    </>
  );
};
