import React, { useState, useEffect, memo, useMemo } from 'react';
import styled from 'styled-components';

import { 
  CircularProgressbarWithChildren, 
  buildStyles, 
} from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

// Colors
import { COLORS } from '../../style_constants.js';

// ミリ秒を分に変換する関数
import { getMinute } from '../../functions/getMinute.js';

const TimeAnalysisBoxWrapper = styled.div`
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

const ContentTimeWrapper = styled.div`
  font-size: 3.0em;
  color: ${COLORS.MAIN};
`;

const CustomSpan = styled.span`
 font-size: 0.6em;
`;

// 単位は分で固定する
export const TimeAnalysisBox = memo(({
  time
}) => {

  // ゲージと分の関数
  const format_min = useMemo(() => getMinute(time), [time]);

  const [timeState, setTimeState] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeState(format_min);
    }, 400);
    return () => clearTimeout(timer);
  }, [
    format_min
  ])

  return (
    <>
      <TimeAnalysisBoxWrapper>
        <CircularProgressbarWithChildren 
          value={timeState} 
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
          maxValue={60}
        >
          <ContentTitleWrapper>
            プレイ時間
          </ContentTitleWrapper>
          <ContentTimeWrapper>
            {timeState}
            <CustomSpan>
              分
            </CustomSpan>
          </ContentTimeWrapper>
        </CircularProgressbarWithChildren>
      </TimeAnalysisBoxWrapper>
    </>
  );
});
