import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const DangerText = styled.p`
  width: 100%;
  margin: 0 auto;
  text-align: left;
  margin-top: ${({
    errors_title
  }) => errors_title === 'Record Not Found' ? '0px' : '2%' };
  margin-bottom: 4%;
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
