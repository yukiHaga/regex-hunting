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
