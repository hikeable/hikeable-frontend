import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'My Hiked Distance',
    },
  },
};

export function LineChart( {dataSet, labelType}) {

    const [label, setLabel] = useState<string>("daily")

    let labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    if (labelType === "monthly"){
        labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    }
    console.log(dataSet);

    const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: 'Dataset 2',
            data: dataSet,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
  return <Line options={options} data={data} />;
}