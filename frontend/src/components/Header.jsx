import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';

// images
import TitleImage from '../images/title.png';

// colors
import COLORS from '../style_constants.js';

const HeaderWrapepr = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: ${COLORS.MAIN};
`;

const HeaderTitleImage = styled.img`
  height: 42px;
  width: 245px;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderTitleImage src={TitleImage} alt="main logo" />
    </HeaderWrapper>
  );
};
