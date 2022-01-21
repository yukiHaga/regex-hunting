import React, { Fragment } from 'react'; 
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// 戻るアイコン
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackToModalButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BackToModalButtonIconWrapper = styled.div`
  border-style: none;
  transition: 0.3s;
  :hover {
    opacity: 0.7;
  }
  cursor: pointer;
  text-decoration: none;
`;

const BackToModalButtonTextWrapper = styled.div`
  border-radius: 3px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 40px;
  color: ${COLORS.BLACK};
  text-align: center;
  border-style: none;
  transition: 0.3s;
  :hover {
    opacity: 0.7;
  }
  cursor: pointer;
  text-decoration: none;
`;

export const BackToModalButton = ({
  onClick
}) => {

  return (
    <>
      <BackToModalButtonWrapper> 
        <BackToModalButtonIconWrapper onClick={onClick}>
          <ArrowBackIcon />
        </BackToModalButtonIconWrapper>
        <BackToModalButtonTextWrapper onClick={onClick}>
          Back
        </BackToModalButtonTextWrapper>
      </BackToModalButtonWrapper>
    </>
  );
};
