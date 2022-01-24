import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const CustomDiv = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const CircularMask = () => {

  return (
    <>
      <CustomDiv>
        <CircularProgress />
      </CustomDiv>
    </>
  );
};
