import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';
import styles from '../utils/style';
import ModuleHeader from './ModuleHeader';

Chart.defaults.global.defaultFontFamily = styles.font;
Chart.defaults.global.defaultFontColor = styles.colorG5;
Chart.defaults.global.defaultFontSize = parseInt(styles.sz1, 10);

/* this line chart graphs the last 10 data points we've seen,
and updates the lower and upper bound of the range to be equal
to the min and max of this dataset, respectively. */
const numData = 5;

// seen from a console.log(cpu.totalMemory)
// const initialMemoryTotal = 2621440;


const MemoryPanel = () => {
  const [numArray, setNumArray] = useState([]);
  // const [min, setMin] = useState(0);
  // const [max, setMax] = useState(initialMemoryTotal);
  const [lastSeenData, setLastSeenData] = useState([0]);
  const cpu = useCPU();

  const chartRef = React.createRef();
  const [lineGraph, setLineGraph] = useState(null);

  const graphData = {
    labels: ['5', '4', '3', '2', '1'],
    datasets: [
      {
        fill: false, // fill area under line
        borderColor: styles.colorP4, // line color
        pointBackgroundColor: styles.colorP4, // point color
        hoverBackgroundColor: styles.colorP3,
        data: numArray,
      },
    ],
  };

  useEffect(() => {
    if (cpu && !lineGraph) {
      const myChartRef = chartRef.current.getContext('2d');

      setLineGraph(
        new Chart(myChartRef, {
          type: 'line',
          data: graphData,
          options: {
            responsive: true,
            aspectRatio: 3 / 2,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: styles.colorG8,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    color: styles.colorG8,
                  },
                },
              ],
            },
          },
        }),
      );
      // setCanvasDrawn(true);
    } else if (cpu && lineGraph) {
      lineGraph.data = graphData;
      // we pass 0 to make it not animate when updating
      lineGraph.update(0);
    }
  }, [cpu, lineGraph, chartRef, graphData]);

  // const setRange = (newArr) => {
  //   setMin(Math.min(...newArr));
  //   setMax(Math.max(...newArr));
  // };

  useEffect(() => {
    if (cpu && lastSeenData !== cpu.nonzeroMemoryTotal) {
      if (numArray.length === numData) {
        const temp = numArray.filter(((ele, i) => i !== 0));
        const newArr = temp.concat(cpu.nonzeroMemoryTotal);
        // setRange(newArr);
        setNumArray(newArr);
      } else {
        const newArr = numArray.concat(cpu.nonzeroMemoryTotal);
        // setRange(newArr);
        setNumArray(newArr);
      }
      setLastSeenData(cpu.nonzeroMemoryTotal);
    }
  }, [cpu, numArray, lastSeenData]);

  if (!cpu) {
    return <Loader />;
  }

  return (
    <>
      <ModuleHeader title="Number of Non-zero Words" />
      <div className="mem-graph">
        <canvas
          id="myChart"
          ref={chartRef}
        />
      </div>
    </>
  );
};


export default MemoryPanel;
