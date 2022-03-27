import React, { Fragment, useState, useEffect } from 'react';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

type MobileFlashMessageArg = {
  display: boolean;
  message: string;
  setMobileState: React.Dispatch<React.SetStateAction<{
    display: boolean;
    message: string;
  }>>;
};

export const MobileFlashMessage = ({
  display,
  message,
  setMobileState
}: MobileFlashMessageArg): JSX.Element => {

  const [open, setOpen] = useState<undefined | boolean>(undefined);

  const handleClose = () => {
    setOpen(false);
    setMobileState((prev) => ({
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
          top: { xs: '10%', md: '10%' }
        }}
        onClose={handleClose}
      >
        <Alert variant="filled" severity="success">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
