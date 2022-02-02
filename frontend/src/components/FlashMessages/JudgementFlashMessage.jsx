import React, { Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Colors
import { COLORS } from '../../style_constants.js';

const JudgementMessageTitle = styled.div`
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 2em;
  padding-top: 1%;
  padding-bottom: 1%;
  color: ${COLORS.SUB};
`;

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
