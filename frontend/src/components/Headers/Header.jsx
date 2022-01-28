import React, { useState, useContext, memo } from 'react';
import styled from 'styled-components';

// アイコン付きメニュー
import { IconMenu } from '../Games/IconMenu.jsx' 

// Colors
import { COLORS } from '../../style_constants.js';

// BaseLink
import { BaseLink } from '../shared_style.js';
 
// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

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

// Responsive
import { WIDTH } from '../../style_constants.js';

// title
const TitleWrapper = styled.div`
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 1.4em;
  color: ${COLORS.SUB};
  -webkit-text-stroke: 5px #030002;
  text-stroke: 5px #030002;
  padding: 5px;
  position: relative;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 0.9em;
    -webkit-text-stroke: 4px #030002;
    text-stroke: 4px #030002;
  }
`;

// fuchiue
const Fuchiue = styled.span`
  -webkit-text-stroke: 0;
  position: absolute;
`;

const HeaderTitleLink = styled(BaseLink)``;

// LPページの場合、onClickLinkはモーダル管理のstateを更新する関数
// ログインしている場合、onClickLinkは何もない。
export const Header = memo(({
  onClickLink,
  onClickMobile
}) => {

  console.log(theme.mixins.toolbar);
  // useContext
  const {
    requestUserState: { sessionState, userState }, 
  } = useContext(UserContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // flexGrowは空いたスペースへの伸び率を表している
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed" color="green" sx={{zIndex: '1101'}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
                >
                  <HeaderTitleLink to={`/`}>
                    <TitleWrapper>
                      <Fuchiue>
                        Regex Hunting
                      </Fuchiue>
                      Regex Hunting
                    </TitleWrapper>
                  </HeaderTitleLink>
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'block', lg: 'none' },
                  }}
                >
                  <MenuItem 
                    key="1" 
                    component={BaseLink}
                    to="/rankings" 
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">
                      ランキング
                    </Typography>
                  </MenuItem>
                  <MenuItem 
                    key="2" 
                    component={BaseLink}
                    to="/?user=mobile"
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">
                      ログイン
                    </Typography>
                  </MenuItem>
                  <MenuItem 
                    key="3" 
                    component={BaseLink}
                    to="/?user=mobile"
                    onClick={handleCloseNavMenu}
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
              {
                sessionState === false && onClickLink && 
                  <>
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'none', lg: 'flex' } }}>
                      <Button
                        key="1"
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        onClick={() => onClickLink("login")}
                      >
                        ログイン
                      </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'none', lg: 'flex' } }}>
                      <Button
                        key="1"
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        onClick={() => onClickLink("signUp")}
                      >
                        新規会員登録
                      </Button>
                    </Box>
                  </>
              }
              {
                sessionState && userState && 
                  <IconMenu 
                    anchorElUser={anchorElUser}
                    handleOpenUserMenu={handleOpenUserMenu}
                    handleCloseUserMenu={handleCloseUserMenu}
                  />
              }
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />
      </ThemeProvider>
    </>
  );
});
