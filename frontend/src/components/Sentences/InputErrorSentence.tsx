import React, { ReactNode } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants';

const DangerText = styled.p`
  text-align: left;
  margin-top: 0px;
  color: ${COLORS.RED};
  font-size: 0.9em;
`;

export const InputErrorSentence = ({children}: {children: ReactNode}): JSX.Element => {
  return (
    <>
      <DangerText>
        {children}
      </DangerText>
    </>
  );
};
