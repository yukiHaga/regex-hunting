import React, { useState } from 'react';

// MUI
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

import { BaseLink } from '../shared_style.js';

// Images
import TemporaryUserImage from '../../images/temporary_user_image.png';

export const IconMenu = ({
  handleLogout
}) => {

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
          src={TemporaryUserImage} 
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