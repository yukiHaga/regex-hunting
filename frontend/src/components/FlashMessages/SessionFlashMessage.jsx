import React, { Fragment, useState } from 'react';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const SessionFlashMessage = ({
  location,
}) => {

  // displayが存在するか、user=moblieが存在するときにtrueになる
  // use=mobileからtrueにさせるのは、useEffect実行時である
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
          position: 'fixed',
          zIndex: 1100,
          top: { xs: '10%', md: '10%' }
        }}
        onClose={
          handleClose
        }
      >
        <Alert variant="filled" severity="success">
          {location?.state?.success}
        </Alert>
      </Snackbar>
    </>
  );
};
