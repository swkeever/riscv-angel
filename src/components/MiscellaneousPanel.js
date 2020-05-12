import React from 'react';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';

const MiscellaneousPanel = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <Loader />;
  }

  // make into component
  return (
    <p>
      {`${cpu.nonzeroMemoryTotal} ${cpu.memoryTotal}`}
    </p>
  );
};

export default MiscellaneousPanel;
