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
  width: 20%;
  height: 30%;
  border-radius: 3px;
  padding: 2%;
  padding-bottom: 0%;
`;

const ContentTitleWrapper = styled.div`
 font-size: 1.5em;
 color: ${COLORS.BLACK};
 letter-spacing: 0.04em;
`;

const ContentNumWrapper = styled.div`
  font-size: 3.0em;
  color: ${COLORS.MAIN};
`;

const CustomSpan = styled.span`
 font-size: 0.6em;
`;

export const LearningAnalysisBox = memo(({
  num
}) => {

  const [numState, setNumState] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNumState(num);
    }, 400);
    return () => clearTimeout(timer);
  }, [
    num
  ])

  return (
    <>
      <LearningAnalysisBoxWrapper>
        <CircularProgressbarWithChildren 
          value={numState} 
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
          maxValue={10}
        >
          <ContentTitleWrapper>
            平均正解数
          </ContentTitleWrapper>
          <ContentNumWrapper>
            {num ? num : "0"}
            <CustomSpan>
              問
            </CustomSpan>
          </ContentNumWrapper>
        </CircularProgressbarWithChildren>
      </LearningAnalysisBoxWrapper>
    </>
  );
});
