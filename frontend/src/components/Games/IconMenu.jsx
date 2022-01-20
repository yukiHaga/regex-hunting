import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// Colors
import { COLORS } from '../../style_constants.js';

const CustomDiv = styled.div`
  position: relative;
`
const CustomUl = styled.ul`
  position: absolute;
  background-color: ${COLORS.WHITE};
`;

export const IconMenu = () => {

  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef()

  useEffect(() => {
    isOpen && menuRef.current.focus()
  }, [isOpen])

  return (
    <>
      <CustomDiv>
        <div onClick={ () => setIsOpen(isOpen ? false : true) }>
          <MenuOutlinedIcon />
        </div>
        {
          isOpen &&
          <CustomUl  
            onBlur={() => setTimeout(() => setIsOpen(false), 100)} 
            ref={menuRef}
            tabIndex={1}
          >
            <li>menu1</li>
            <li>menu2</li>
          </CustomUl>
        }
      </CustomDiv>
    </>
  );
};
