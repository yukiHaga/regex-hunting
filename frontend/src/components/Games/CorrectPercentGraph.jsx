import React, { memo, useState, useEffect } from 'react';
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
  SubTitle,
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
  SubTitle,
  Tooltip,
  Legend
);

const InnerCorrectPercentGraphWrapper = styled.div`
  width: 700px;
`;

// 親コンポーネント(MyPages)のuseEffectが実行されるまで、
// これらのcorrect_percentsは[]である。
export const CorrectPercentGraph = memo(({
  elementary_graph_data,
}) => {

  const initialState = {
    x_data: [],
    y_data: [],
  };

  const [dataState, setDataState] = useState(initialState);

  // 初回にグラフを表示させるためのuseEffect
  // 今月のx座標(月日)とy座標(正答率)のオブジェクトを取得する
  // このオブジェクトのプロパティがx座標
  // このオブジェクトのキーがy座標
  useEffect(() => {
    if(Object.keys(elementary_graph_data).length) {
      const month_obj = elementary_graph_data; 
      console.log(month_obj);
      setDataState((prev) => ({
        ...prev,
        x_data: Object.keys(month_obj),
        y_data: Object.values(month_obj)
      }));
    }
  }, [
    elementary_graph_data,
  ])

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
      },
      subtitle: {
        display: true,
        text: '(※) ゲームクリアしたデータに対して、正答率を算出しています。',
        position: 'bottom',
        padding: {
          top: 10,
          bottom: 2
        }
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
});
