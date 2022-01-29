import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';

import { 
  CircularProgressbarWithChildren, 
  buildStyles, 
} from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

// Colors
import { COLORS } from '../../style_constants.js';

const LearningAnalysisBoxWrapper = styled.div`
  width: 22%;
  height: 30%;
  background-color: ${COLORS.WHITE};
  border-radius: 3px;
  padding: 2%;
  padding-bottom: 0%;
`;

const ContentTitleWrapper = styled.div`
 font-size: 1.5em;
 color: ${COLORS.BLACK};
 letter-spacing: 0.04em;
`;

const ContentPercentWrapper = styled.div`
  font-size: 3.0em;
  color: ${COLORS.MAIN};
`;

const CustomSpan = styled.span`
 font-size: 0.6em;
`;

export const LearningAnalysisBox = memo(({
  content_title,
  percentage
}) => {

  const [percentState, setPercentState] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentState(percentage);
    }, 400);
    return () => clearTimeout(timer);
  }, [
    percentage
  ])

  return (
    <>
      <LearningAnalysisBoxWrapper>
        <CircularProgressbarWithChildren 
          value={percentState} 
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
        >
          <ContentTitleWrapper>
            {content_title}
          </ContentTitleWrapper>
          <ContentPercentWrapper>
            {percentage}
            <CustomSpan>
              %
            </CustomSpan>
          </ContentPercentWrapper>
        </CircularProgressbarWithChildren>
      </LearningAnalysisBoxWrapper>
    </>
  );
});