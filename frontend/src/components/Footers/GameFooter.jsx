import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const FooterWrapper = styled.div`
  background-color: ${COLORS.BROWN};
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
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexDirection: { xs: 'column', md: 'row' }, display: 'flex' }}>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
                <Button
                  key="1"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={handleGameDescriptionDialog}
                >
                  スライドを見る
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
                <Button
                  key="1"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={handleMetaDialog}
                >
                  メタ文字一覧 
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </FooterWrapper>
    </>
  );
};
