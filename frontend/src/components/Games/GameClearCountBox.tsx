import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

// Colors
import { COLORS } from '../../style_constants.js';

import { WIDTH } from '../../style_constants.js';

const GameClearCountBoxWrapper = styled.div`
  width: 18%;
  height: 30%;
  background-color: ${COLORS.WHITE};
  border-radius: 50%;
  box-shadow: 0 0px 4px rgba(0,0,0,0.2);
`;

const ContentTitleWrapper = styled.div`
 font-size: 1.5em;
 color: ${COLORS.BLACK};
 letter-spacing: 0.04em;
 @media (max-width: ${WIDTH.DEV_TOOL}) {
   font-size: 1.3em;
 }
`;

const ContentCountWrapper = styled.div`
  font-size: 3.0em;
  color: ${COLORS.MAIN};
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 2.5em;
  }
`;

const CustomSpan = styled.span`
 font-size: 0.6em;
 @media (max-width: ${WIDTH.DEV_TOOL}) {
   font-size: 0.5em;
 }
`;

export const GameClearCountBox = memo(({
  count
}: {count: number}): JSX.Element => {

  const [countState, setCountState] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountState(count);
    }, 400);
    return () => clearTimeout(timer);
  }, [
    count
  ])

  return (
    <>
      <GameClearCountBoxWrapper>
        <CircularProgressbarWithChildren
          value={countState ? countState : 0}
          strokeWidth={4}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'round',

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.7,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `${COLORS.MAIN}`,
            textColor: `${COLORS.MAIN}`,
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
          maxValue={1}
        >
          <ContentTitleWrapper>
            クリア回数
          </ContentTitleWrapper>
          <ContentCountWrapper>
            {count ? count : "0"}
            <CustomSpan>
              回
            </CustomSpan>
          </ContentCountWrapper>
        </CircularProgressbarWithChildren>
      </GameClearCountBoxWrapper>
    </>
  );
});
