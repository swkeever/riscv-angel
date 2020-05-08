import React from 'react';
//import useInterval from '../hooks/use-interval';
import SimplePieChart from './PieChart';
import useCPU from '../hooks/use-cpu';

const InstructionDisplay = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <h1>Loading...</h1>;
  }
  console.log(cpu.instruction_amounts);

  // return <h1> HELLO</h1>;
  return <SimplePieChart data={cpu.instruction_amounts}/>;
};

export default InstructionDisplay;
