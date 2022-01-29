import React, { memo, useMemo } from 'react';
import styled from 'styled-components';

import { 
  CircularProgressbarWithChildren, 
  buildStyles, 
} from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

// Colors
import { COLORS } from '../../style_constants.js';

// クリアタイムを取得する関数
// マイページで使う場合、第1引数は0を指定する
import { getClearTime } from '../../functions/getClearTime.js';

const FastAnalysisBoxWrapper = styled.div`
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

const ContentPercentWrapper = styled.div`
  font-size: 3.0em;
  color: ${COLORS.MAIN};
`;

export const FastAnalysisBox = memo(({
  minutes
}) => {

  // 今月の最速タイムを出力する処理 
  // minutesに任意の難易度の最速タイムが入っている
  const format_fastest_time =  useMemo(() => getClearTime(0, minutes).slice(3), [minutes]);

  return (
    <>
      <FastAnalysisBoxWrapper>
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
          <ContentTitleWrapper>
            最速タイム
          </ContentTitleWrapper>
          <ContentPercentWrapper>
            {minutes ? format_fastest_time : "なし"}
          </ContentPercentWrapper>
        </CircularProgressbarWithChildren>
      </FastAnalysisBoxWrapper>
    </>
  );
});
