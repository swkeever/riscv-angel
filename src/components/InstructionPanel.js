import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';
import ModuleHeader from './ModuleHeader';
import styles from '../utils/style';

export default function InstructionPanel() {
  const cpu = useCPU();
  const chartRef = React.createRef();
  const [chart, setChart] = useState(null);

  let instAmounts;
  let graphData;

  useEffect(() => {
    if (!cpu) {
      return;
    }

    if (!chart) {
      const ref = chartRef.current.getContext('2d');

      setChart(
        new Chart(ref, {
          type: 'pie',
          data: graphData,
          options: {
            legend: {
              fontSize: styles.size[5],
              position: 'left',
              labels: {
                padding: parseInt(styles.size[5], 10),
              },
            },
            tooltips: true,
            rotation: Math.PI / 4,
          },
        }),
      );
    } else {
      chart.data = graphData;
      chart.update(0);
    }
  }, [cpu, chart, chartRef, graphData]);

  if (!cpu) {
    return <Loader />;
  }

  // instAmounts = [{label: string, value: number}]
  instAmounts = cpu.instruction_amounts;

  // TODO: memoryOrder is always 0 so i'm deleting it for now
  instAmounts = instAmounts.filter((i) => i.label !== 'memoryOrder');

  const labels = instAmounts.map((i) => i.label);
  let values = instAmounts.map((i) => i.value);

  if (values.every((v) => v === 0)) {
    values = values.fill(1 / values.length);
  }

  const arcColors = instAmounts.map((_, idx) => styles.color[`p${idx + 3}`]);

  graphData = {
    datasets: [
      {
        data: values,
        backgroundColor: arcColors,
        borderColor: styles.color.g9,
        hoverBackgroundColor: arcColors,
      },
    ],

    labels,
  };

  return (
    <>
      <ModuleHeader title="Instructions" />
      <div className="canvas-container">
        <canvas className="inst-pie" ref={chartRef} />
      </div>
    </>
  );
}
