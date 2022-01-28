import React, { memo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { BaseLink } from '../shared_style.js';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// デフォルトのアバター画像
import DefaultAvatarImage from '../../images/default_avatar.png';

// ログイン関係のAPIコール関数
import { deleteUserSession } from '../../apis/login'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

export const IconMenu = memo(({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}) => {

  // useContext
  const {
    requestUserState: { userState: { user } }, 
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // navigate
  let navigate = useNavigate();

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
      navigate('/', { state: { display: true, success: "ログアウトしました。"}})
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

  return (
    <>
      <Box sx={{ flexGrow: 0, mx: 2}}>
        <Tooltip title={user.name} >
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar 
              alt="user-icon" 
              src={user.image || DefaultAvatarImage} 
            />
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
          <MenuItem 
            key="1"
            component={BaseLink}
            to="/my-page"
            onClick={handleCloseUserMenu}
          >
            <Typography textAlign="center">
              マイページ
            </Typography>
          </MenuItem>
          <MenuItem 
            key="2"
            component={BaseLink}
            to="/account-settings"
            onClick={handleCloseUserMenu}
          >
            <Typography textAlign="center">
              アカウント設定
            </Typography>
          </MenuItem>
          <MenuItem 
            onClick={handleLogout}
          >
            <Typography textAlign="center">
              ログアウト
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
});
