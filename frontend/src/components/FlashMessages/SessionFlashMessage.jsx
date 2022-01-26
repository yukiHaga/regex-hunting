import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@mui/material/Snackbar';

// フラッシュメッセージを浮かせる
const CustomDiv = styled.div`
  position: absolute;
  z-index: 0;
  right: 0;
  padding: 20px;
`;

export const SessionFlashMessage = ({
  location,
}) => {

  const [open, setOpen] = useState(Boolean(location?.state?.display));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomDiv>
        <Snackbar 
          open={open} 
          autoHideDuration={4000} 
          onClose={handleClose}
        >
          <Alert variant="filled" severity="success">
            {location?.state?.success}
          </Alert>
        </Snackbar>
      </CustomDiv>
    </>
  );
};
