import React, { Fragment } from 'react';
import styled from 'styled-components';

// 戻るアイコン
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackToModalButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 3px;
  border-style: none;
  transition: 0.3s;
  :hover {
    opacity: 0.7;
  }
  cursor: pointer;
  text-decoration: none;
`;

const BackToModalButtonTextWrapper = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.2em;
  text-align: center;
  border-style: none;
  transition: 0.3s;
  :hover {
    opacity: 0.7;
  }
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  padding-top: 2%;
`;

export const BackToModalButton = ({
  onClick
}) => {

  return (
    <>
      <BackToModalButtonWrapper onClick={onClick}>
        <ArrowBackIcon
          fontSize='medium'
        />
        <BackToModalButtonTextWrapper>
          Back
        </BackToModalButtonTextWrapper>
      </BackToModalButtonWrapper>
    </>
  );
};
