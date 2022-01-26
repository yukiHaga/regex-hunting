import React, { Fragment, useState } from 'react';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@mui/material/Snackbar';

export const SessionFlashMessage = ({
  location,
}) => {

  const [open, setOpen] = useState(Boolean(location?.state?.display));

  const handleClose = () => {
    setOpen(false);
  };

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
          position: 'absolute',
          zIndex: 1099,
        }}
        onClose={handleClose}
      >
        <Alert variant="filled" severity="success">
          {location?.state?.success}
        </Alert>
      </Snackbar>
    </>
  );
};
