import React, { useState, useContext } from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

import { BaseLink } from '../shared_style.js';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// デフォルトのアバター画像
import DefaultAvatarImage from '../../images/default_avatar.png';

export const IconMenu = ({
  handleLogout
}) => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: { 
      userState: { user },
    },
  } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar 
          alt="user-icon" 
          src={user.image || DefaultAvatarImage} 
          sx={{ width: 32, height: 32 }}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          component={BaseLink}
          to="/my-page"
          onClick={handleClose}
        >
          マイページ
        </MenuItem>
        <MenuItem 
          component={BaseLink}
          to="/account-settings"
          onClick={handleClose}
        >
          アカウント設定
        </MenuItem>
        <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
      </Menu>
    </>
  );
};
