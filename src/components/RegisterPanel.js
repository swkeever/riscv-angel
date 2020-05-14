import React from 'react';
import RegMenu from './RegMenu';
import getRegisters from '../utils/registers';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';
import ModuleHeader from './ModuleHeader';

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
      <ModuleHeader title="Registers" />
      <RegMenu registers={registersAppended} />
    </>
  );
};

export default RegisterPanel;
