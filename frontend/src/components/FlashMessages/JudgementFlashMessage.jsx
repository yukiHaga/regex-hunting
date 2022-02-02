import React, { Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';

// フラッシュメッセージ関係のコンポーネント;
// import Slide from '@mui/material/Slide';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Colors
import { COLORS } from '../../style_constants.js';

// handleTitleColorType
// タイトルカラーを取り扱う関数
import { handleTitleColorType } from '../../functions/handleTitleColorType.js'

/*
const CustomSlide = styled(Slide)`
`;

const JudgementFlashMessageWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
*/

const JudgementMessageTitle = styled.div`
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 2em;
  padding-top: 1%;
  padding-bottom: 1%;
  color: ${COLORS.SUB};
`;

/*
const JudgementMessage = styled.div`
  width: 190px;
  height: 50px;
  pointerEvents: 'none';
  background-color: ${COLORS.SUB};
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-style: normal;
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 5px;
`;
*/

export const JudgementFlashMessage = ({
  flash_display,
  flash_title,
}) => {

  const [display, setDisplay] = useState(flash_display);

  const handleClose = () => {
    setDisplay(false);
  };

  useEffect(() => {
    if(flash_display) {
      setDisplay(flash_display);
    }
  },[
    flash_display
  ])

  return (
    <>
      <Snackbar 
        open={display} 
        autoHideDuration={2000} 
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right' 
        }}
        sx={{
          position: 'fixed',
          zIndex: 1100,
          top: { xs: '12.5%', md: '12.5%' },
          right: { xs: '1.5%', md: '1.5%' }
        }}
        onClose={handleClose}
      >
        <Alert 
          icon={false} 
          variant="filled" 
          severity={flash_title === "Good" ? "success" : "error"}
        >
          <JudgementMessageTitle>
            {flash_title}
          </JudgementMessageTitle>
        </Alert>
      </Snackbar>
    </>
  );
};
