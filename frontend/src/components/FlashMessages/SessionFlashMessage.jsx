import React, { Fragment } from 'react';

// フラッシュメッセージ関係のコンポーネント;
import Alert from '@material-ui/lab/Alert';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';

const CustomSlide = styled(Slide)`
`

const AlertWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const CustomAlert = styled(Alert)`
  width: 180px;
  margin-top: 8px;
  margin-right: 16px;
  pointerEvents: 'none';
`

export const SessionFlashMessage = ({
  flashState,
  sessionState, 
  userState,
  handleFlash 
}) => {


  return (
    <>
      <CustomSlide 
        direction="left" 
        in={Boolean(flashState.display)} 
        timeout={{ enter: 1200, exit: 1200 }} 
        mountOnEnter 
        unmountOnExit
        addEndListener={() => (setTimeout(() => (handleFlash(sessionState, userState)), 4000))}
      >
        <AlertWrapper>
          <CustomAlert severity="success">
            {flashState.success}
          </CustomAlert>
        </AlertWrapper>
      </CustomSlide>
    </>
  );
};
