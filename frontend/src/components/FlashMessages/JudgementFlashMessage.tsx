import React, { Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Colors
import { COLORS } from '../../style_constants';

const JudgementMessageTitle = styled.div`
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 2em;
  padding-top: 1%;
  padding-bottom: 1%;
  color: ${COLORS.SUB};
`;

// JudgementFlashMessageの引数の型
type JudgementFlashMessageArg = {
  flashDisplay: boolean;
  flashTitle: "" | "Good" | "Bad";
};

export const JudgementFlashMessage = ({
  flashDisplay,
  flashTitle,
}: JudgementFlashMessageArg): JSX.Element => {

  const [display, setDisplay] = useState(flashDisplay);

  const handleClose = () => {
    setDisplay(false);
  };

  useEffect(() => {
    if(flashDisplay) {
      setDisplay(flashDisplay);
    }
  },[
    flashDisplay
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
          severity={flashTitle === "Good" ? "success" : "error"}
        >
          <JudgementMessageTitle>
            {flashTitle}
          </JudgementMessageTitle>
        </Alert>
      </Snackbar>
    </>
  );
};
