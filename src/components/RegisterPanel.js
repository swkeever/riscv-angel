import React from 'react';
import RegMenu from './RegMenu';
import getRegisters from '../utils/registers';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';

const RegisterPanel = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <Loader />;
  }

  const allRegisters = getRegisters();

  const registersAppended = cpu.registers.map((reg, i) => (
    { ...allRegisters[i], value: reg.low_ }
  ));

  return (
    <>
      <h2 className="module-header">Registers</h2>
      <RegMenu registers={registersAppended} />
    </>
  );
};

export default RegisterPanel;
