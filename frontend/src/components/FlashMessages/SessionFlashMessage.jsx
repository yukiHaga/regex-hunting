import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@mui/material/Snackbar';

export const SessionFlashMessage = ({
  location,
}) => {

  // displayが存在するか、user=moblieが存在するときにtrueになる
  const [open, setOpen] = useState(Boolean(location?.state?.display));

  const handleClose = () => {
    setOpen(false);
  };

  // mobileから何か操作されたら、このuseEffectが実行される
  useEffect(() => {
    if(new URLSearchParams(location?.search)?.get('user') === 'mobile') {
      setOpen(true);
    } 
  }, [
    location?.search
  ])

  const navigate = useNavigate();

  // フラッシュメッセージが出現後、クエリストリングを削除する関数
  const handleNavigateClose = () => {
    handleClose();
    navigate('/');
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
          top: { sm: '10%', md: '10%' }
        }}
        onClose={
          new URLSearchParams(location?.search)?.get('user') === 'mobile' ?
            handleNavigateClose
          :
            handleClose
        }
      >
        <Alert variant="filled" severity="success">
          {location?.state?.success || 'PCからご利用ください'}
        </Alert>
      </Snackbar>
    </>
  );
};
