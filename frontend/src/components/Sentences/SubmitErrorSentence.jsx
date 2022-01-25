import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const DangerText = styled.p`
  text-align: left;
  margin-top: ${({
    errors_title
  }) => errors_title === 'Record Not Found' ? '0px' : '8px' };
  margin-bottom: 16px;
  color: ${COLORS.RED};
`;

export const SubmitErrorSentence = ({
  children,
  errors_title
}) => {
  return (
    <>
      <DangerText
        errors_title={errors_title}
      >
        {children}
      </DangerText>
    </>
  );
};
