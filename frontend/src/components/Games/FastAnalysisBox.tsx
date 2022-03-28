import React, { memo, useMemo } from 'react';
import styled from 'styled-components';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

// Colors
import { COLORS } from '../../style_constants';

// クリアタイムを取得する関数
// マイページで使う場合、第1引数は0を指定する
import { getClearTime } from '../../functions/getClearTime';

import { WIDTH } from '../../style_constants';

const FastAnalysisBoxWrapper = styled.div`
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

const ContentPercentWrapper = styled.div`
  font-size: 3.0em;
  color: ${COLORS.MAIN};
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 2.5em;
  }
`;

export const FastAnalysisBox = memo(({
  minutes
}: {minutes: number}): JSX.Element => {

  // 今月の最速タイムを出力する処理
  // minutesに任意の難易度の最速タイムが入っている
  const formatFastestTime =  useMemo(() => getClearTime(0, minutes), [minutes]);

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
            {minutes ? formatFastestTime : "なし"}
          </ContentPercentWrapper>
        </CircularProgressbarWithChildren>
      </FastAnalysisBoxWrapper>
    </>
  );
});
