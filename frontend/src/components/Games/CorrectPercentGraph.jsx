import React, { useMemo } from 'react';
import styled from 'styled-components';

// react-chartjs-2 
import { Line } from 'react-chartjs-2';

// chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Colors
import { COLORS } from '../../style_constants.js';

// chsrt.jsのプラグインを事前に登録しておく
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InnerCorrectPercentGraphWrapper = styled.div`
  width: 700px;
`;

export const CorrectPercentGraph = ({
  elementary_correct_percents,
  intermediate_correct_percents,
  advanced_correct_percents
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

  // legendはグラフの判例の設定を行うオプション
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: '初級編の正答率',
        font: {
          size: 24
        },
        color: COLORS.BLACK,
      }
    },
    scales: {
      y: { 
        min: 0,
        max: 100,
        ticks: {
          // 目盛にドル記号を入れる
          callback: function(value, index, values) {
            return value + '%';
          }
        }
      },
    },
    layout: {
        padding: 10
    }
  };

  const labels = [
    '1/1', 
    '1/2',
    '1/3',
    '1/4',
    '1/5',
    '1/6',
    '1/7',
    '1/8',
    '1/9',
    '1/10',
    '1/11',
    '1/12',
    '1/13',
    '1/14',
    '1/15',
    '1/16',
    '1/17',
    '1/18',
    '1/19',
    '1/20',
    '1/21',
    '1/22',
    '1/23',
    '1/24',
    '1/25',
    '1/26',
    '1/27',
    '1/28',
    '1/29',
    '1/30',
    '1/31',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: '正答率',
        data: [null, null, 60, 0, 60, 90, 100, 100, 100, {x: '1/31', y: 70}],
        borderColor: COLORS.MAIN,
        backgroundColor: COLORS.MAIN,
        lineTension: 0,
      },
    ],
  };

  // Lineはcanvas要素になる
  // 1000px * 600pxである
  return (
    <>
      <InnerCorrectPercentGraphWrapper>
        <Line 
          options={options} 
          data={data} 
        />
      </InnerCorrectPercentGraphWrapper>
    </>
  );
};
