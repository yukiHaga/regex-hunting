import React, { Fragment } from 'react';
import styled from 'styled-components';

// CloseIcon
import { CloseIcon } from '../Icons/index';

// Colors
import { COLORS } from '../../style_constants.js';

const CloseIconWrapper = styled.div`
  display: flex;
  justify-content: end;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const CustomCloseIcon = styled(CloseIcon)`
  color: ${COLORS.BLACK};
`;

type CloseButtonArg = {
  onClose: () => void;
  fontSize: "small" | "inherit" | "large" | "medium" | undefined;
};

export const CloseButton = ({onClose, fontSize}: CloseButtonArg): JSX.Element => {
  return (
    <>
      <CloseIconWrapper>
        <CustomCloseIcon onClick={onClose} fontSize={fontSize} />
      </CloseIconWrapper>
    </>
  );
};
