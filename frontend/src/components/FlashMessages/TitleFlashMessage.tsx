import React, { Fragment, useState, useEffect } from 'react';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { SetMyPageState } from '../../types/containers/myPages';

type TitleFlashMessageArg = {
  display: boolean;
  message: string;
  setMyPageState: SetMyPageState;
};

export const TitleFlashMessage = ({
  display,
  message,
  setMyPageState
}: TitleFlashMessageArg): JSX.Element => {

  const [open, setOpen] = useState<undefined | boolean>(undefined);

  const handleClose = () => {
    setOpen(false);
    setMyPageState((prev) => ({
      ...prev,
      display: false,
      message: ""
    }))
  };

  useEffect(() => {
    if(display) {
      setOpen(display);
    }
  },[
    display
  ])

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{
          position: 'fixed',
          zIndex: 1100,
          top: { xs: '10%', md: '12%' }
        }}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          severity={ message === "称号の変更に失敗しました。" ? "error" : "success" }>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
