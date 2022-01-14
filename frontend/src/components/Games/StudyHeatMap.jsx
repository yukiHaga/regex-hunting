import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// React Heat Map
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const InnerStudyHeatMapWrapper = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;

export const StudyHeatMap = () => {

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
        <CalendarHeatmap
          startDate={prev_month_end_day}
          endDate={this_month_end_day}
          showMonthLabels={false}
          showWeekdayLabels={true}
          showOutOfRangeDays={false}
          gutterSize={1}
          horizontal={false}
          values={[
            { date: '2022-01-01', count: 33 },
            { date: '2022-01-22', count: 122 },
            { date: '2022-01-30', count: 38 },
            { date: '2022-01-31', count: 1000 },
          ]}
        />
      </InnerStudyHeatMapWrapper>
    </>
  );
};
