import React, { useState, useContext } from 'react';
import styled from 'styled-components';

// アイコン付きメニュー
import { IconMenu } from '../Games/IconMenu.jsx' 

// Colors
import { COLORS } from '../../style_constants.js';

// BaseLink
import { BaseLink, FakeLink } from '../shared_style.js';
 
// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// ログイン関係のAPIコール関数
import { deleteUserSession } from '../../apis/login'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

// useNavigate
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// デフォルトのアバター画像
import DefaultAvatarImage from '../../images/default_avatar.png';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${COLORS.MAIN};
  width: 100%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  position: fixed;
  z-index: 1;
`;

// title
const TitleWrapper = styled.div`
  height: 45px;
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 27px;
  line-height: 45px;
  color: ${COLORS.SUB};
  -webkit-text-stroke: 5px #030002;
  text-stroke: 5px #030002;
  padding: 5px;
  margin-left: 30px;
  position: relative;
`

// fuchiue
const Fuchiue = styled.span`
  -webkit-text-stroke: 0;
  position: absolute;
`

const HeaderNav = styled.nav`
  margin-right: 40px;
`;

const HeaderTitleLink = styled(BaseLink)``;

const HeaderNavLink = styled(BaseLink)`
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

const HeaderNavFakeLink = styled(FakeLink)`
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

const ColorDiv = styled.div`
  background-color: ${COLORS.MAIN};
`;

// LPページの場合、onClickLinkはモーダル管理のstateを更新する関数
// ログインしている場合、onClickLinkは何もない。
export const Header = ({
  onClickLink,
  image
}) => {

  // navigate
  let navigate = useNavigate();

  // useContext
  const {
    requestUserState: { sessionState, userState }, 
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // ログアウトを管理する関数
  const handleLogout = () => {
    deleteUserSession().then((data) => {
      dispatch({
        type: requestUserActionTyps.REQUEST_SUCCESS,
        payload: {
          session: data.session,
          user: data.user,
        }
      });
    }).then(() => {
      navigate('/?user=logout', { state: { display: true, success: "ログアウトしました。"}})
    } 
    ).catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
        dispatch({
          type: requestUserActionTyps.REQUEST_FAILURE,
          payload: {
            errors: e.response.data.errors
          }
        });
      } else {
        throw e;
      }
    });
  };
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

  return (
    <>
      <ColorDiv>
        <AppBar position="fixed" color='inherit'>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                Regex Hunting
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem key="1" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">ログイン</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                Regex Hunting
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  key="1"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  ログイン
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={DefaultAvatarImage} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="ログイン" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">ログイン</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ColorDiv>
    </>
  );
};
