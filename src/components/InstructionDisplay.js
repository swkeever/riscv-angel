import React from 'react';
import SimplePieChart from './SimplePieChart';
import useCPU from '../hooks/use-cpu';

const InstructionDisplay = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <>
      <h2 className="module-header">Instruction Ratios</h2>
      <SimplePieChart data={cpu.instruction_amounts} total={cpu.total} />
    </>
  );
};

export default InstructionDisplay;
