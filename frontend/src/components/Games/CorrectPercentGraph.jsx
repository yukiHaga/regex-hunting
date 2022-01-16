import React, { useState, useMemo, useEffect } from 'react';
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

// グラフのx座標とy座標を生成する関数 
import { makeCorrectPercentGraphData } from '../../functions/makeCorrectPercentGraphData.js'

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

  const initialState = {
    x_data: [],
    y_data: []
  };

  const [dataState, setDataState] = useState(initialState);

  // 今日
  const today = useMemo(() => new Date(), []);

  // 今月の月初
  const this_month_first_day = useMemo(() => new Date(
    today.setDate(1)
  ), [
    today
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

  // 今月のx座標(月日)とy座標(正答率)のオブジェクトを取得する
  // このオブジェクトのプロパティがx座標
  // このオブジェクトのキーがy座標
  const month_obj = useMemo(() => makeCorrectPercentGraphData(
    elementary_correct_percents,
    this_month_first_day,
    this_month_end_day
  ), [
    elementary_correct_percents,
    this_month_first_day,
    this_month_end_day
  ]);

  useEffect(() => {
    if(Object.values(month_obj).length) {
      console.log("useEffectの中");
      setDataState((prev) => ({
        ...prev,
        x_data: Object.keys(month_obj),
        y_data: Object.values(month_obj)
      }));
    }
  }, [
    month_obj
  ])

  console.log(dataState);

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

  const labels = dataState["x_data"];

  const data = {
    labels,
    datasets: [
      {
        label: '正答率',
        data: dataState["y_data"],
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
