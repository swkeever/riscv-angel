import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import RegMenu from './RegMenu';
// import useCPU from '../hooks/use-cpu';
import useInterval from '../hooks/use-interval';


import getRegisters from '../utils/registers';

const RegisterPanel = () => {
  const [cpu, setCpu] = useState(null);

  useInterval(() => {
    setCpu(window.myCpu);
  }, 1000);

  if (!cpu) {
    return <h1>Loading...</h1>;
  }

  console.log(cpu.instruction_amounts);

  const allRegisters = getRegisters();

  const registersAppended = cpu.registers.map((reg, i) => (
    { ...allRegisters[i], value: reg.low_ }
  ));

  return (
    <RegMenu registers={registersAppended} />
  );
};

export default RegisterPanel;
