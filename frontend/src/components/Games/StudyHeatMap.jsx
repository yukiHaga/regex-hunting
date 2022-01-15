import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// React Heat Map
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// Tooltip
import ReactTooltip from 'react-tooltip';

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
  const today = new Date();

  // 今月の月初
  const this_month_first_day = new Date(today.setDate(1));

  // 前月の月末
  const prev_month_end_day = new Date(this_month_first_day.setDate(0));

  // 来月の月初
  const next_month_later_today = new Date(today.setMonth(today.getMonth() + 1));

  // 今月の月末
  const this_month_end_day = new Date(next_month_later_today.setDate(0));

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
          values={
            Object.entries(game_frequencies_per_day).map(
              ([date, count]) => ({date, count})
            )
          }
          tooltipDataAttrs={value => {
            return value.date ?
              {
                'data-tip': `ゲームクリア回数: ${value.count}, ${
                  value.date.replace(/-/g, '/')
                }`
              }
            :
              {
                'data-tip': 'ゲームをプレイしていません。'
              }  
          }}
        />
        <ReactTooltip />
      </InnerStudyHeatMapWrapper>
    </>
  );
};
