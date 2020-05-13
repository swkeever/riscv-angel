import React from 'react';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';
import MemoryGraph from './MemoryGraph';

const MiscellaneousPanel = () => {
  const cpu = useCPU();
  // console.log(numArray);

  if (!cpu) {
    return <Loader />;
  }

  console.log(cpu.nonzeroMemoryTotal, cpu.memoryTotal);

  // make into component
  return (
    // <p>
    //   {`${cpu.nonzeroMemoryTotal} ${cpu.memoryTotal}`}
    // </p>
    <MemoryGraph next={cpu.nonzeroMemoryTotal} />
  );
};

export default MiscellaneousPanel;
