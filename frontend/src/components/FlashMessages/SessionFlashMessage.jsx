import React, { Fragment } from 'react';
import styled from 'styled-components';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@material-ui/lab/Alert';
import Slide from '@mui/material/Slide';

const CustomSlide = styled(Slide)`
`;

const AlertWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const CustomAlert = styled(Alert)`
  width: 180px;
  margin-top: 8px;
  margin-right: 16px;
  pointerEvents: 'none';
`;

export const SessionFlashMessage = ({
  location,
  navigate,
  url
}) => {


  return (
    <>
      <CustomSlide 
        direction="left" 
        in={Boolean(location?.state?.display)} 
        timeout={{ enter: 1500, exit: 1000 }} 
        mountOnEnter 
        unmountOnExit
        addEndListener={() => (setTimeout(() => (navigate(url)), 2500))}
      >
        <AlertWrapper>
          <CustomAlert severity="success">
            {location?.state?.success}
          </CustomAlert>
        </AlertWrapper>
      </CustomSlide>
    </>
  );
};
