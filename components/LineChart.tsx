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
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import {compareDate, getDayAndMonth, getLastNDays} from '../src/DateFunctions';

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

export function LineChart( {dataSet}) {

    const [period, setPeriod] = React.useState<number>(40);
    const [label, setLabel] = useState<string>(`Last ${period} days`)
    const [dataOnLine, setData] = useState<number[]>([]);

    const handlePeriod = (event: React.MouseEvent<HTMLElement>, newPeriod: number) => {
      setPeriod(newPeriod);
      setLabel(`Last ${period} days`);
      getLastNDays(period);
    };

    let lastFullDays = getLastNDays(period);
    let labels = getDayAndMonth(lastFullDays);

    console.log(dataSet);

    // function getValues(a, b) {
    //     let result = [];
    //     for (let i = 0; i < a.length; i++) {
    //       for (let j = 0; j < b.length; j++) {
    //         if (a[i].trail_id == b[j].id) {
    //           result.push({
    //             date: a[i].date,
    //             length: b[j].length
    //           })
    //         }
    //       }
    //     }
    //     return result;
    //   }
    console.log("🌏");
    console.log(lastFullDays);
    console.log(dataSet);
    // let res : number[] = new Array(lastFullDays.length).fill(0);

    let res : number[] =[];
    // for (let i = 0; i < 10; i++){
    //     res[i] = 0;
    // }
    


    for (let i = 0; i < lastFullDays.length; i++){
        // console.log("index i is : ", i);
        if (i === 0)
            res[i] = 0;
        else res[i] = res[i-1];
        for (let j = 0; j < dataSet.length; j ++){
            // console.log("index j is : ", j);
            if (compareDate(lastFullDays[i], dataSet[j].date)){
                // console.log("🥶 ", dataSet[j].length);
                // console.log(res[i]);
                if (i >= 1){

                    // console.log("total is : ", parseInt(dataSet[j].length) + (res[i - 1]));
                    // console.log("res[i-1] is: ", res[i-1]);
                    // console.log("dataset[j] is ", parseInt(dataSet[j].length))
                    res[i] = parseInt(dataSet[j].length) + (res[i - 1]);
                }
                else {
                    // console.log("else condition entered");
                    res[i] += parseInt(dataSet[j].length);
                }

                // console.log("res[i] now is : ", res[i]);
            }
            // console.log("res[i] now is : ", res[i]);
        }

    }
    console.log("🐓");
    console.log(res);
    
    // for (let pair of dataSet){
    //     console.log(typeof pair.date);

    //     if (label.includes(pair.date)){

    //         res.push(pair.length)
    //     }
    //     else
    //     res.push(0)
    // }
    // console.log(res);

    const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: label,
            data: res,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
  return (
    
    <>
        <Line options={options} data={data} />
        
        <ToggleButtonGroup
            value={period}
            exclusive
            onChange={handlePeriod}
            aria-label="text alignment"
        >
            <ToggleButton value={30} aria-label="monthly">
                Monthly
            </ToggleButton>
            <ToggleButton value={7} aria-label="weekly">
                Weekly
            </ToggleButton>

        </ToggleButtonGroup></>
    );
}