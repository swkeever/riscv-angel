import React from 'react';
import SimplePieChart from './SimplePieChart';
import useCPU from '../hooks/use-cpu';

const InstructionDisplay = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <p>Loading...</p>;
  }

  return <SimplePieChart data={cpu.instruction_amounts} total={cpu.total} />;
};

export default InstructionDisplay;
