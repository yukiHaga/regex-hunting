import React from 'react';
import styled from 'styled-components';

// MUI
import Avatar from '@mui/material/Avatar';

// Colors
import { COLORS } from '../../style_constants.js';

// Images
import TemporaryUserImage from '../../images/temporary_user_image.png';

const AccountSettingBoxWrapper = styled.div`
  width: 50%;
  background-color: ${COLORS.WHITE};
  margin: 0 auto;
`;

const AccountSettingBoxImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const AccountSettingBoxFormWrapper = styled.div`
`;

export const AccountSettingBox = () => {
  return (
    <>
      <AccountSettingBoxWrapper>
        <AccountSettingBoxImageWrapper>
          <Avatar
            alt="Hunter"
            src={TemporaryUserImage}
            sx={{ width: 250, height: 250 }}
          />
        </AccountSettingBoxImageWrapper>
        <AccountSettingBoxFormWrapper>
        </AccountSettingBoxFormWrapper>
      </AccountSettingBoxWrapper>
    </>
  );
};
