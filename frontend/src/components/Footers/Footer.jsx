import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

// BaseLink
import { BaseLink } from '../shared_style.js';

const FooterWrapper = styled.div`
  background-color: ${COLORS.BROWN};
`;

// 遷移するスピードが早すぎるから、リップルエフェクトが最後の四角の状態になるまで表示されない
// 四角の状態になる前にページが遷移する
// hrefを/#にして検証済
export const Footer = () => {
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
                  component={BaseLink}
                  to="/policy"
                >
                  利用規約
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
                <Button
                  key="1"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={BaseLink}
                  to="/privacy-policy"
                >
                  プライバシーポリシー
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </FooterWrapper>
    </>
  );
};
