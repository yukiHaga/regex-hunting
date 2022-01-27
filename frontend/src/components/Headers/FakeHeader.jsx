import React from 'react';

// BaseLink
import { BaseLink } from '../shared_style.js';
 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme.js';
import CssBaseline from '@mui/material/CssBaseline';

// LPページの場合、onClickLinkはモーダル管理のstateを更新する関数
// ログインしている場合、onClickLinkは何もない。
export const FakeHeader = () => {

  // flexGrowは空いたスペースへの伸び率を表している
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="green">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
                >
                  Regex Hunting
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  sx={{
                    display: { xs: 'block', md: 'block', lg: 'none' },
                  }}
                >
                  <MenuItem 
                    key="1" 
                    component={BaseLink}
                    to="/rankings" 
                  >
                    <Typography textAlign="center">
                      ランキング
                    </Typography>
                  </MenuItem>
                  <MenuItem 
                    key="2" 
                    component={BaseLink}
                    to="/?user=mobile"
                  >
                    <Typography textAlign="center">
                      ログイン
                    </Typography>
                  </MenuItem>
                  <MenuItem 
                    key="3" 
                    component={BaseLink}
                    to="/?user=mobile"
                  >
                    <Typography textAlign="center">
                      新規会員登録
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'none', lg: 'flex' } }}>
                <Button
                  key="1"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href='/rankings'
                >
                  ランキング
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};
