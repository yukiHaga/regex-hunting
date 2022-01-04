import React from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js'; 

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

const CustomDialogInnerWrapper = styled.div`
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${COLORS.SUB};
  text-align: center;
  height: 450px;
  width: 550px;
`;

const CustomDialogTitleWrapper = styled.div`
  height: 74px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 74px;
  color: ${COLORS.WHITE};
  padding-top: 30px;
  -webkit-text-stroke: 6px ${COLORS.MAIN};
  position: relative;
`;

const CustomSpan = styled.span`
  -webkit-text-stroke: 0;
  position: absolute;
`;

const CustomDialogContent = styled(DialogContent)`
  text-align: center;
`;

const CustomDialogContentSentence = styled(DescriptionWrapper)`
`;

export const ElementaryGameDescriptionDialog = ({
  isOpen,
  setGameState
}) => {

  return(
    <Dialog
      open={isOpen}
    >
      <CustomDialogInnerWrapper> 
        <CustomDialogTitleWrapper>
          <CustomSpan>初級編</CustomSpan>
          初級編
        </CustomDialogTitleWrapper> 
        <CustomDialogContent>
          <CustomDialogContentSentence>
            正規表現とは？
          </CustomDialogContentSentence>
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
