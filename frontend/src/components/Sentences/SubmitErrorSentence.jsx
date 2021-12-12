import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const DangerText = styled.p`
  text-align: left;
  margin-top: 0px;
  margin-bottom: 16px;
  color: ${COLORS.RED};
`;

export const SubmitErrorSentence = ({children}) => {
  return (
    <>
      <DangerText>
        {children}
      </DangerText>
    </>
  );
};
