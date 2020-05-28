import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';
import styles from '../utils/style';
import ModuleHeader from './ModuleHeader';

const MemoryPanel = () => {
  const [numArray, setNumArray] = useState([]);
  const [lastSeenData, setLastSeenData] = useState([0]);
  const cpu = useCPU();

  const chartRef = React.createRef();
  const [lineGraph, setLineGraph] = useState(null);

  /* this line chart graphs the last 10 data points we've seen,
     and updates the lower and upper bound of the range to be equal
     to the min and max of this dataset, respectively. */
  const numData = 10;

  const graphData = {
    labels: Array(numData)
      .fill()
      .map((_, idx) => (idx + 1).toString())
      .reverse(),
    datasets: [
      {
        fill: false, // fill area under line
        borderColor: styles.color.p4, // line color
        pointBackgroundColor: styles.color.p4, // point color
        hoverBackgroundColor: styles.color.p2,
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
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: styles.color.g8,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    color: styles.color.g8,
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

  useEffect(() => {
    if (cpu && lastSeenData !== cpu.nonzeroMemoryTotal) {
      if (numArray.length === numData) {
        const temp = numArray.filter((ele, i) => i !== 0);
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
      <p>
        {`${(parseFloat(cpu.nonzeroMemoryTotal / cpu.memoryTotal) * 100).toFixed(2)} % `}
      </p>
      <div className="canvas-container">
        <canvas id="myChart" ref={chartRef} />
      </div>
    </>
  );
};

export default MemoryPanel;
