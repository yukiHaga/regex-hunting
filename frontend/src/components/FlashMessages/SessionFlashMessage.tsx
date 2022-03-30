import React, { Fragment, useState } from 'react';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// SessionFlashMessagの引数の型
type SessionFlashMessagArg = {
  location: {
    state: {
      display: boolean;
      success: string;
    }
  }
};

const collorFunc = (state: SessionFlashMessagArg['location']['state']) => {
  if(state?.success === 'ログインに失敗しました。') {
    return 'warning';
  }
  return 'success';
}

export const SessionFlashMessage = ({
  location: { state }
}: SessionFlashMessagArg): JSX.Element => {

  // displayが存在するか、user=moblieが存在するときにtrueになる
  // use=mobileからtrueにさせるのは、useEffect実行時である
  const [open, setOpen] = useState(Boolean(state?.display));

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
          top: { xs: '10%', md: '12%' }
        }}
        onClose={
          handleClose
        }
      >
        <Alert variant="filled" severity={collorFunc(state)}>
          {state?.success}
        </Alert>
      </Snackbar>
    </>
  );
};
