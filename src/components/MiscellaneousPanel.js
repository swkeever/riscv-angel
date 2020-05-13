import React from 'react';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';
import MemoryGraph from './MemoryGraph';

// Honestly, we might think about getting rid of this component
// its just a placeholder to store the graph, and potentially endian feature
const MiscellaneousPanel = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <Loader />;
  }

  console.log(cpu.nonzeroMemoryTotal, cpu.memoryTotal);

  // make into component
  return (
    <MemoryGraph next={cpu.nonzeroMemoryTotal} />
  );
};

export default MiscellaneousPanel;
