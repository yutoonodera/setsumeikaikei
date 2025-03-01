import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Graph = ({ totalAssets, totalLiabilities, totalCapital }) => {
  console.log('totalAssets:', totalAssets);
  console.log('totalLiabilities:', totalLiabilities);
  console.log('totalCapital:', totalCapital);

  Chart.register(ChartDataLabels);

  const data = {
    labels: ['BS'],
    datasets: [
      {
        label: '資産',
        data: [(totalAssets / totalAssets) * 100], // 資産は常に100%になる
        backgroundColor: '#36A2EB',
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: '資本',
        data: [(totalCapital / totalAssets) * 100], // 資本を％に変換
        backgroundColor: '#FFCE56',
        borderWidth: 1,
        stack: 'stack1',
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: '負債',
        data: [(totalLiabilities / totalAssets) * 100], // 負債を％に変換
        backgroundColor: '#FF6384',
        borderWidth: 1,
        stack: 'stack1',
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ]
  };


  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: {
          font: { size: 14 }
        }
      },
      y: {
        beginAtZero: true,
        max: 100, // 最大値を100%に固定
        stepSize: 10, // 10%刻みに設定
        grid: { display: true },
        ticks: {
          font: { size: 14 },
          callback: function (value) {
            return value + '%'; // 縦軸をパーセンテージ表示
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // 元の値を計算して表示（円としてフォーマット）
            const datasetIndex = tooltipItem.datasetIndex;
            const rawValue = tooltipItem.raw; // rawは割合になっている
            const originalValue = (rawValue / 100) * totalAssets; // 金額に戻す
            return `${originalValue.toLocaleString()}円`; // 円形式で表示
          },
          title: function () {
            return ''; // タイトルは非表示
          }
        }
      },
      datalabels: {
        display: true,
        color: 'black',
        font: { size: 14, weight: 'bold' },
        formatter: function (value) {
          return value.toFixed(0) + '%'; // グラフ上のラベルはパーセンテージ
        }
      }
    }
  };




  return <Bar data={data} options={options} />;
};

export default Graph;
