import React, { Fragment } from 'react';
import styled from 'styled-components';

import { BaseLink } from '../shared_style';

// Colors
import { COLORS } from '../../style_constants';

const DescriptionBackToMyPageButtonWrapper = styled(BaseLink)`
  margin-top: 2%;
  border-style: none;
  border-radius: 3px;
  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    opacity: 0.7;
  }
  cursor: pointer;
  text-decoration: none;
  width: 25%;
  background-color: ${COLORS.MAIN};
  margin-right: 2%;
`;

const DescriptionBackToMyPageButtonTextWrapper = styled.div`
  border-radius: 3px;
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.WHITE};
  text-align: center;
  padding: 5%;
`;

export const DescriptionBackToMyPageButton = (): JSX.Element => {
  return (
    <>
    <DescriptionBackToMyPageButtonWrapper to={'/my-page'}>
        <DescriptionBackToMyPageButtonTextWrapper>
          マイページに戻る
        </DescriptionBackToMyPageButtonTextWrapper>
      </DescriptionBackToMyPageButtonWrapper>
    </>
  );
};