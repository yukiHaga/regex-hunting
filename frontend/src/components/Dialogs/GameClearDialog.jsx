import React from 'react';
import styled from 'styled-components';

// useNavigate
import { useNavigate } from "react-router-dom";

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// Images
// import LoginImage from '../../images/login.png';

// Button
// import { CloseButton } from '../Buttons/CloseButton.jsx';

// Sentence
// import { PasswordResetSentence } from '../Sentences/PasswordResetSentence.jsx';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

const CustomDialogInnerWrapper = styled.div`
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${COLORS.WHITE};
  text-align: center;
`;

const CustomDialogTitleImage = styled.img`
  height: 50px;
  width: 80px
  object-fit: contain;
  padding: 8px 23px;
`;

const CustomDialogContent = styled(DialogContent)`
  height: 440px;
  width: 400px;
`;

export const GameClearDialog = ({
  isOpen,
}) => {

  // navigate
  let navigate = useNavigate();

  // <CustomDialogTitleImage src={LoginImage} alt="Login" />
  return(
    <Dialog
      open={isOpen}
    >
      <CustomDialogInnerWrapper> 
        <CustomDialogContent>
          アイウエオ
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
