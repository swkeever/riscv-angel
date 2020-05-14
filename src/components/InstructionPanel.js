import React from 'react';
import SimplePieChart from './SimplePieChart';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';
import ModuleHeader from './ModuleHeader';

const InstructionPanel = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <Loader />;
  }

  return (
    <>
      <ModuleHeader title="Instruction Ratios" />
      <SimplePieChart data={cpu.instruction_amounts} total={cpu.totalInstructions} />
    </>
  );
};

export default InstructionPanel;
