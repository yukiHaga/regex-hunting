import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const CustomDiv = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const CircularMask = (): JSX.Element => {

  return (
    <>
      <CustomDiv>
        <CircularProgress />
      </CustomDiv>
    </>
  );
};
