import React from 'react';
import styled from 'styled-components';

// Image
import CutFlashImage from '../../images/moment_cut_image.png'; 

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
  width: 80%;
  height: 50%;
  object-fit: contain;
  z-index: 2;
`;

export const CutImage = () => {
  return (
    <>
      <Mask>
        <CustomImage src={CutFlashImage} />
      </Mask>
    </>
  );
};
