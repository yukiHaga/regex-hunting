import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const DangerText = styled.p`
  text-align: left;
  margin-top: 0px;
  margin-bottom: 32px;
  color: ${COLORS.RED};
`;

export const InputErrorSentence = ({children}) => {
  return (
    <>
      <DangerText>
        {children}
      </DangerText>
    </>
  );
};
