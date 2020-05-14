import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';


/* this line chart graphs the last 10 data points we've seen,
and updates the lower and upper bound of the range to be equal
to the min and max of this dataset, respectively. */
const numData = 10;

// seen from a console.log(cpu.totalMemory)
const initialMemoryTotal = 2621440;

const MemoryPanel = () => {
  const [numArray, setNumArray] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(initialMemoryTotal);
  const [lastSeenData, setLastSeenData] = useState([0]);
  const cpu = useCPU();

  const setRange = (newArr) => {
    setMin(Math.min(...newArr));
    setMax(Math.max(...newArr));
  };

  useEffect(() => {
    if (cpu && lastSeenData !== cpu.nonzeroMemoryTotal) {
      if (numArray.length === numData) {
        const temp = numArray.filter(((ele, i) => i !== 0));
        const newArr = temp.concat(cpu.nonzeroMemoryTotal);
        setRange(newArr);
        setNumArray(newArr);
      } else {
        const newArr = numArray.concat(cpu.nonzeroMemoryTotal);
        setRange(newArr);
        setNumArray(newArr);
      }
      setLastSeenData(cpu.nonzeroMemoryTotal);
    }
  }, [cpu, numArray, lastSeenData]);

  if (!cpu) {
    return <Loader />;
  }

  const data = {

    labels: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
    datasets: [
      {
        label: 'Number of Nonzero Words',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: numArray,
      },
    ],
  };

  const chartOptions = {
    showScale: true,
    pointDot: true,
    showLines: true,

    legend: {
      display: true,
      labels: {
        boxWidth: 50,
        fontSize: 10,
        fontColor: '#bbb',
        padding: 5,
      },
    },

    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min,
          max,
        },
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
        },
      }],
    },
  };

  return <Line data={data} options={chartOptions} />;
};


export default MemoryPanel;
