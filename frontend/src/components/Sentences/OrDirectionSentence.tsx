import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants';

const OrDirectionSentenceWrapper = styled.div`
  color: ${COLORS.BLACK};
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    border-top: 1px solid;
    content: "";
    width: 110px;
    margin-right: 25px;
  }
  &:after {
    border-top: 1px solid;
    content: "";
    width: 110px;
    margin-left: 25px;
  }
  margin-bottom: 3%;
  font-size: 0.9em;
`;

export const OrDirectionSentence = (): JSX.Element => {
  return (
    <>
      <OrDirectionSentenceWrapper>
        または
      </OrDirectionSentenceWrapper>
    </>
  );
};
