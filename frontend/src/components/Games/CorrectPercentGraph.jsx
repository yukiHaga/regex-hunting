import React from 'react';
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

import { DescriptionWrapper } from '../../components/shared_style.js';

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
  width: 660px;
`;

/*
const CorrectPercentGraphSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 24px;
  line-height: 40px;
  display: inline-block;
  text-align: left;
`;
*/

export const CorrectPercentGraph = () => {

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
        data: [0, 0, 60, 70, 60, 90, 100, 100, 100],
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
