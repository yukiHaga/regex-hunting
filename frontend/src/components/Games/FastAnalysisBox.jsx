import React, { memo } from 'react';
import styled from 'styled-components';

import { 
  CircularProgressbarWithChildren, 
  buildStyles, 
} from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

// Colors
import { COLORS } from '../../style_constants.js';

// デフォルトのアバター画像
import DefaultAvatarImage from '../../images/default_avatar.png';

const TimeAnalysisBoxWrapper = styled.div`
  width: 22%;
  height: 30%;
  border-radius: 3px;
  padding: 2%;
  padding-bottom: 0%;
`;

const ContentBackGroundWrapper = styled.div`
  background-image: url(${DefaultAvatarImage});
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

export const FastAnalysisBox = memo(({
  content_title,
  minutes
}) => {

  return (
    <>
      <TimeAnalysisBoxWrapper>
        <CircularProgressbarWithChildren 
          value={60} 
          strokeWidth={2}
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
            pathColor: `${COLORS.LIGHT_BLACK}`,
            textColor: `${COLORS.MAIN}`,
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
          maxValue={60}
        >
          <ContentBackGroundWrapper>
            <ContentTitleWrapper>
              {content_title}
            </ContentTitleWrapper>
            <ContentPercentWrapper>
              {minutes}
            </ContentPercentWrapper>
          </ContentBackGroundWrapper>
        </CircularProgressbarWithChildren>
      </TimeAnalysisBoxWrapper>
    </>
  );
});
