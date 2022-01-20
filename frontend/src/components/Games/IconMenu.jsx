import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// Colors
import { COLORS } from '../../style_constants.js';

export const IconMenu = () => {

  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef()

  useEffect(() => {
    isOpen && menuRef.current.focus()
  }, [isOpen])

  return (
    <>
      <div>
        <div onClick={ () => setIsOpen(isOpen ? false : true)} }>
          <MenuOutlinedIcon />
        </div>
        {
          isOpen &&
          <ul  
            onBlur={() => setTimeout(() => setIsOpen(false), 100)} 
            ref={menuRef}
            tabIndex={1}
          >
            <li><a href="/somewhere">menu1</a></li>
            <li>menu2</li>
          </ul>
        }
      </div>
    </>
  );
};
