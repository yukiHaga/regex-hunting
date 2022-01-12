import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Image
import CutImage from '../../images/cut_image.gif'; 

const Mask = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomImage = styled.img`
  z-index:2;
`;

export const ElementaryMonster = ({
}) => {
  return (
    <>
      <Mask>
        <CustomImage src={CutImage} />
      </Mask>
    </>
  );
};
