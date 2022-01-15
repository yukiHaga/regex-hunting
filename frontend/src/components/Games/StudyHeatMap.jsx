import React, { useMemo } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// React Heat Map
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// ヒートマップの頻度のcss
import './study_heat_map.css';

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

const StudyHeatMapSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 24px;
  line-height: 40px;
  display: inline-block;
  text-align: left;
`;

export const StudyHeatMap = ({
  game_frequencies_per_day
}) => {

  // 今日
  const today = useMemo(() => new Date(), []);

  // 今月の月初
  const this_month_first_day = useMemo(() => new Date(
    today.setDate(1)
  ), [
    today
  ]);

  // 前月の月末
  const prev_month_end_day = useMemo(() => new Date(
    this_month_first_day.setDate(0)
  ), [
    this_month_first_day
  ]);

  // 来月の月初
  const next_month_later_today = useMemo(() => new Date(
    today.setMonth(today.getMonth() + 1)
  ), [
    today
  ]);

  // 今月の月末
  const this_month_end_day = useMemo(() => new Date(
    next_month_later_today.setDate(0)
  ), [
    next_month_later_today
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

  // startDateはその日を含まない
  // そのため、startDateには先月の月末を指定する
  return (
    <>
      <InnerStudyHeatMapWrapper>
        <StudyHeatMapSentenceWrapper>
          学習カレンダー
        </StudyHeatMapSentenceWrapper>
        <CalendarHeatmap
          startDate={prev_month_end_day}
          endDate={this_month_end_day}
          showMonthLabels={false}
          showWeekdayLabels={true}
          showOutOfRangeDays={false}
          gutterSize={1}
          horizontal={false}
          values={month_obj_array}
          tooltipDataAttrs={(value) => {
            return {
              'data-tip': `ゲームクリア回数: ${value.count}, ${
                value.date.replace(/-/g, '/')}`
            };
          }}
          classForValue={(value) => {
            if (!value.count) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
          }}
        />
        <ReactTooltip />
      </InnerStudyHeatMapWrapper>
    </>
  );
};
