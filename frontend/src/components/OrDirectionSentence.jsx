import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../style_constants.js';

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
  margin-bottom: 15px;
`;

export const OrDirectionSentence = () => {
  return (
    <>
      <OrDirectionSentenceWrapper>
        または
      </OrDirectionSentenceWrapper>
    </>
  );
};
