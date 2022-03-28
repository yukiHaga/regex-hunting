import React from 'react';
import styled from 'styled-components';

// Image
import MainTitleImage from '../../images/main_title.png';

// Responsive
import { WIDTH } from '../../style_constants';

// BaseLink
import { BaseLink } from '../shared_style';

const MainTitleImageCover = styled.img`
  width: 14vw;
  height: 9vh;
  object-fit: contain;
  max-width: 100%;
  @media (max-width: ${WIDTH.MOBILE}) {
    width: 30vw;
    height: 7vh;
  };
`;

const HeaderTitleLink = styled(BaseLink)`
`;

export const HeaderTitle = (): JSX.Element => {
  return (
    <>
      <HeaderTitleLink to={`/`}>
        <MainTitleImageCover width="1187" height="354" src={MainTitleImage} alt="main-title" />
      </HeaderTitleLink>
    </>
  );
};
