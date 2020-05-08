import React from 'react';
import SimplePieChart from './SimplePieChart';
import useCPU from '../hooks/use-cpu';

const InstructionDisplay = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <h1>Loading...</h1>;
  }
  console.log(cpu.instruction_amounts);

  return <SimplePieChart data={cpu.instruction_amounts} total={cpu.total} />;
};

export default InstructionDisplay;
