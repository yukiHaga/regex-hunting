import React, { memo, useMemo } from 'react';
import styled from 'styled-components';

// React Heat Map
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// Tooltip
import ReactTooltip from 'react-tooltip';

// functions
import { makeThisMonthObj } from '../../functions/makeThisMonthObj.js';
import { addCountToMonthArray } from '../../functions/addCountToMonthArray.js';

// DescriptionWrapper
import { DescriptionWrapper } from '../../components/shared_style.js';

const InnerStudyHeatMapWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
`;

export const StudyHeatMap = memo(({
  game_frequencies_per_day,
}) => {

  // 今月の月初
  const this_month_first_day = useMemo(() => new Date(
    new Date(
      new Date().getFullYear(), 
      new Date().getMonth(), 
      1
    )
  ), [
  ]);

  // 前月の月末
  const prev_month_end_day = useMemo(() => new Date(
    new Date().setDate(0), 
  ), [
  ]);

  // 今月の月末
  const this_month_end_day = useMemo(() => new Date(
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
  const month_obj = useMemo(() => makeThisMonthObj(
    this_month_first_day,
    this_month_end_day
  ),[
    this_month_first_day,
    this_month_end_day
  ]);

  // 日付とカウントをキーに持つオブジェクトを要素とした配列を生成 
  const month_obj_array = useMemo(() => addCountToMonthArray(
    game_frequencies_per_day,
    month_obj
  ),[
    game_frequencies_per_day,
    month_obj
  ])

  // ヒートマップの色を返す関数
  const getColorForHeatMap = (count) => {
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
          startDate={prev_month_end_day}
          endDate={this_month_end_day}
          showMonthLabels={false}
          showWeekdayLabels={true}
          showOutOfRangeDays={false}
          gutterSize={1}
          horizontal={false}
          values={month_obj_array}
          tooltipDataAttrs={({count, date}) => {
            return {
              'data-tip': `ゲームクリア回数: ${count}, ${
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
