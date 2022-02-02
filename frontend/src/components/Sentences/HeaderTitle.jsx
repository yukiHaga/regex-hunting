import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Responsive
import { WIDTH } from '../../style_constants.js';

// BaseLink
import { BaseLink } from '../shared_style.js';

// title
const TitleWrapper = styled.div`
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 1.4em;
  color: ${COLORS.SUB};
  -webkit-text-stroke: 5px #030002;
  text-stroke: 5px #030002;
  padding: 5px;
  position: relative;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 0.9em;
    -webkit-text-stroke: 4px #030002;
    text-stroke: 4px #030002;
  }
`;

// fuchiue
const Fuchiue = styled.span`
  -webkit-text-stroke: 0;
  position: absolute;
`;

const HeaderTitleLink = styled(BaseLink)``;

export const HeaderTitle = () => {
  return (
    <>
      <HeaderTitleLink to={`/`}>
        <TitleWrapper>
          <Fuchiue>
            Regex Hunting
          </Fuchiue>
          Regex Hunting
        </TitleWrapper>
      </HeaderTitleLink>
    </>
  );
};
