import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// handleColorType 
import { handleColorType } from '../../functions/handleColorType.js';

/*
  background-color: ${COLORS.LIGHT_BLACK};
  */
const HpGageWrapper = styled.div`
  background-color: ${COLORS.GAGE_GRAY};
  border-radius: 0 0 3px 3px;
  width: 100%;
  height: 31px;
  display: flex;
  box-sizing: border-box;
  border-left: 5px solid;
  border-right: 5px solid;
  border-bottom: 5px solid;
  border-color: ${COLORS.GAGE_GRAY};
`;

const TypeWrapper = styled.div`
  height: 26px;
  width: 120px;
  font-size: 18px;
  line-height: 26px;
  background-color: ${COLORS.GAGE_GRAY};
  color: ${COLORS.BROWN};
  font-family: YuGothic;
  font-weight: bold;
  text-align: center;
`;

const GageOuterWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 10px;
`;

const GageWrapper = styled.div`
  height: 100%;
  width: ${(props) => `${100 * (props.user_hp / props.user_max_hp)}%`};
  background-color: ${(props) => handleColorType(props.user_hp)};
  box-sizing: border-box;
  border: none;
  outline: none;
  transition: 0.5s;
  border-radius: 10px;
`;

export const HpGage = ({
  user_hp,
  user_max_hp
}) => {
  return (
    <>
      <HpGageWrapper>
        <TypeWrapper>
          HP
        </TypeWrapper>
        <GageOuterWrapper>
          <GageWrapper 
            user_hp={user_hp}
            user_max_hp={user_max_hp}
          />
        </GageOuterWrapper>
      </HpGageWrapper>
    </>
  );
};
