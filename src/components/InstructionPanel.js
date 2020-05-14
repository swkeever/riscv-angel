import React from 'react';
import SimplePieChart from './SimplePieChart';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';

const InstructionPanel = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <Loader />;
  }

  return (
    <>
      <h2 className="module-header">Instruction Ratios</h2>
      <SimplePieChart data={cpu.instruction_amounts} total={cpu.totalInstructions} />
    </>
  );
};

export default InstructionPanel;
