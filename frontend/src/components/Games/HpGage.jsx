import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// handleColorType 
import { handleColorType } from '../../functions/handleColorType.js';

const HpGageWrapper = styled.div`
  background-color: ${COLORS.GAGE_GRAY};
  border-radius: 0 0 3px 3px;
  width: 100%;
  display: flex;
  height: 3.9vh;
  box-sizing: border-box;
  border-left: 5px solid;
  border-right: 5px solid;
  border-bottom: 5px solid;
  border-color: ${COLORS.GAGE_GRAY};
`;

const TypeWrapper = styled.div`
  width: 8.5%;
  font-size: 1.2em;
  background-color: ${COLORS.GAGE_GRAY};
  color: ${({ user_hp }) => handleColorType(user_hp)};
  font-weight: bold;
  text-align: center;
  -webkit-text-stroke: 2px #030002;
  text-stroke: 2px #030002;
  position: relative;
`;

// fuchiue
const Fuchiue = styled.span`
  -webkit-text-stroke: 0;
  position: absolute;
`;

const GageOuterWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 10px;
  border: 1px solid #000;
  box-shadow: inset 1px 1px 3px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 0 rgba(255, 255, 255, 0.12);
`;

const GageWrapper = styled.div`
  height: 100%;
  width: ${({
    user_hp,
    user_max_hp
  }) => `${100 * (user_hp / user_max_hp)}%`};
  background-color: ${({ user_hp }) => handleColorType(user_hp)};
  box-sizing: border-box;
  border: none;
  outline: none;
  transition: 0.5s;
  border-radius: 10px;
  background-image: -webkit-linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  background-image: linear-gradient(transparent 0%,rgba(255,255,255,.3) 50%,transparent 50%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.2) inset,0 2px 10px 0 rgba(255,255,255,.5) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
`;

export const HpGage = ({
  user_hp,
  user_max_hp
}) => {
  return (
    <>
      <HpGageWrapper>
        <TypeWrapper
          user_hp={user_hp}
        >
          <Fuchiue>
            HP 
          </Fuchiue>
          HP
        </TypeWrapper>
        <GageOuterWrapper>
          {
            (user_hp / user_max_hp) !== 0 &&
              <GageWrapper 
                user_hp={user_hp}
                user_max_hp={user_max_hp}
              />
          }
        </GageOuterWrapper>
      </HpGageWrapper>
    </>
  );
};
