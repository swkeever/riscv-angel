import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import useInterval from '../hooks/use-interval';

/* this line chart graphs the last 10 data points we've seen,
and updates the lower and upper bound of the range to be equal
to the min and max of this dataset, respectively. */
const numData = 10;

const MemoryGraph = ({ next }) => {
  const [numArray, addToNumArray] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(2500000);

  const setRange = (newArr) => {
    setMin(Math.min(...newArr));
    setMax(Math.max(...newArr));
  };

  useInterval(() => {
    // const answer = (parseFloat(next) / total) * 100
    console.log(next);
    if (numArray.length === numData) {
      const temp = numArray.filter(((ele, i) => i !== 0));
      const newArr = temp.concat(next);
      setRange(newArr);
      addToNumArray(newArr);
    } else {
      const newArr = numArray.concat(next);
      setRange(newArr);
      addToNumArray(newArr);
    }
  }, 1000);

  console.log(numArray);
  const data = {

    // i want to come up with better label names
    // these are also random style attributes which i copied, but the color does look nice
    labels: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
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

MemoryGraph.propTypes = {
  next: PropTypes.number.isRequired,
};

export default MemoryGraph;
