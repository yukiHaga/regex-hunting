import React, { memo, useMemo } from 'react';
import styled from 'styled-components';

// React Heat Map
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// Tooltip
import ReactTooltip from 'react-tooltip';

// functions
import { makeThisMonthObj } from '../../functions/makeThisMonthObj';
import { addCountToMonthArray } from '../../functions/addCountToMonthArray';

const InnerStudyHeatMapWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-left: 13%;
`;

type StudyHeatMapArg = {
  gameFrequenciesPerDay: {
    [key: string]: number;
  }
};

export const StudyHeatMap = memo(({
  gameFrequenciesPerDay,
}: StudyHeatMapArg): JSX.Element => {

  // 今月の月初
  const thisMonthFirstDay = useMemo(() => new Date(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    )
  ), [
  ]);

  // 前月の月末
  const prevMonthEndDay = useMemo(() => new Date(
    new Date().setDate(0),
  ), [
  ]);

  // 今月の月末
  const thisMonthEndDay = useMemo(() => new Date(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    )
  ), [
  ]);

  // 今月の日付とカウントをプロパティに持つオブジェクトを生成
  // レンダリング毎に行われる不要な計算をスキップするためにuseMemoを使用
  // useMemoで関数の結果を保持できる。
  const monthObj = useMemo(() => makeThisMonthObj(
    thisMonthFirstDay,
    thisMonthEndDay
  ),[
    thisMonthFirstDay,
    thisMonthEndDay
  ]);

  // 日付とカウントをキーに持つオブジェクトを要素とした配列を生成
  const monthObjArray = useMemo(() => addCountToMonthArray(
    gameFrequenciesPerDay,
    monthObj
  ),[
    gameFrequenciesPerDay,
    monthObj
  ])

  // ヒートマップの色を返す関数
  const getColorForHeatMap = (count: number): string => {
    switch (true){
      case count >= 1 && count <= 4 :
        return `color-github-${count}`
      case count > 4:
        return 'color-github-4'
      default:
        return 'color-empty'
    }
  };

  // startDateはその日を含まない
  // そのため、startDateには先月の月末を指定する
  return (
    <>
      <InnerStudyHeatMapWrapper>
        <CalendarHeatmap
          startDate={prevMonthEndDay}
          endDate={thisMonthEndDay}
          showMonthLabels={false}
          showWeekdayLabels={true}
          showOutOfRangeDays={false}
          gutterSize={1}
          horizontal={false}
          values={monthObjArray}
          tooltipDataAttrs={({count, date}: {count: number, date: string}) => {
            return {
              'data-tip': `ゲーム回数: ${count}, ${
                date?.replace(/-/g, '/')}`
            };
          }}
          classForValue={(value) => getColorForHeatMap(value?.count)}
          transformDayElement={(element, value, index) =>
            React.cloneElement(element, { rx: 2, ry: 2 })
          }
        />
        <ReactTooltip />
      </InnerStudyHeatMapWrapper>
    </>
  );
});
