import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import useInterval from '../hooks/use-interval';

const MemoryGraph = ({ next }) => {
  const [numArray, addToNumArray] = useState([]);

  useInterval(() => {
    // const answer = (parseFloat(next) / total) * 100
    if (numArray.length === 10) {
      const temp = numArray.filter(((ele, i) => i !== 0));
      addToNumArray(temp.concat(next));
    } else {
      addToNumArray(numArray.concat(next));
    }
  }, 1000);

  console.log(numArray);
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'd', 'e', 'f'],
    datasets: [
      {
        label: 'My First dataset',
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
          min: 980000,
          max: 990000,
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

MemoryGraph.propTypes = {
  next: PropTypes.number.isRequired,
};

export default MemoryGraph;
