import React from 'react';
import styled from 'styled-components';

// Image
import MainTitleImage from '../../images/main_title.svg';

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

const MainTitleImageCover = styled.img`
  width: 18%;
  height: auto;
  object-fit: contain;
  max-width: 100%;
  height: auto;
  @media (max-width: ${WIDTH.MOBILE}) {
    width: 30%
  };
`;

const HeaderTitleLink = styled(BaseLink)`
`;

export const HeaderTitle = () => {
  return (
    <>
      <HeaderTitleLink to={`/`}>
        <MainTitleImageCover src={MainTitleImage} alt="main-title" />
      </HeaderTitleLink>
    </>
  );
};
