import React from 'react';
import styled from 'styled-components';

// react-chartjs-2 
import { Bar } from 'react-chartjs-2';

// Colors
import { COLORS } from '../../style_constants.js';

import { DescriptionWrapper } from '../../components/shared_style.js';

const InnerCorrectPercentGraphWrapper = styled.div`
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
        text: '正答率',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <InnerCorrectPercentGraphWrapper>
        <Bar 
          options={options} 
          data={data} 
        />
      </InnerCorrectPercentGraphWrapper>
    </>
  );
};
