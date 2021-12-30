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
  width: 220px;
  margin-top: 8px;
  margin-right: 16px;
  pointerEvents: 'none';
`;

export const GoodFlashMessage = ({
  question_finish,
  commentary
}) => {

  // addEndListener={() => (setTimeout(() => (navigate(url)), 2500))}
  return (
    <>
      <CustomSlide 
        direction="left" 
        in={question_finish} 
        timeout={{ enter: 1000, exit: 1000 }} 
        mountOnEnter 
        unmountOnExit
      >
        <AlertWrapper>
          <CustomAlert severity="success">
            {commentary}
          </CustomAlert>
        </AlertWrapper>
      </CustomSlide>
    </>
  );
};
