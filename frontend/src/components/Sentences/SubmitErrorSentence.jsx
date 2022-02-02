import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const DangerTextWrapper = styled.div`
  margin: 0 auto;
`;

const DangerText = styled.p`  
  display: inline-block;
  text-align: left;
  margin-top: ${({
    errors_title
  }) => errors_title === 'Record Not Found' ? '0px' : '2%' };
  margin-bottom: 4%;
  color: ${COLORS.RED};
  font-size: 0.9em;
`;

export const SubmitErrorSentence = ({
  children,
  errors_title
}) => {
  return (
    <>
      <DangerTextWrapper>
        <DangerText
          errors_title={errors_title}
        >
          {children}
        </DangerText>
      </DangerTextWrapper>
    </>
  );
};
