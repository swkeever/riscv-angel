import React, { useState } from 'react';
import getRegisters from '../utils/registers';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';
import ModuleHeader from './ModuleHeader';

const RegisterPanel = () => {
  const [filter, setFilter] = useState('all');

  const cpu = useCPU();

  if (!cpu) {
    return <Loader />;
  }

  const allRegisters = getRegisters();

  const registersAppended = cpu.registers.map((reg, i) => (
    { ...allRegisters[i], value: reg.low_ }
  ));

  const getFilteredRegisters = () => {
    switch (filter) {
      case 'callee-saved':
        return registersAppended.filter((r) => r.saver === 'Callee');
      case 'caller-saved':
        return registersAppended.filter((r) => r.saver === 'Caller');
      case 'all':
        return registersAppended;
      default:
        throw Error('unknown filter');
    }
  };

  const filteredRegisters = getFilteredRegisters();
  const getClassName = (type) => (type === filter ? 'btn-active' : undefined);

  const CurrentCategory = () => (
    <div className="btn-group" role="group">
      <button
        className={getClassName('callee-saved')}
        type="button"
        onClick={() => setFilter('callee-saved')}
      >
        Callee-saved
      </button>
      <button
        className={getClassName('caller-saved')}
        type="button"
        onClick={() => setFilter('caller-saved')}
      >
        Caller-saved
      </button>
      <button
        className={getClassName('all')}
        type="button"
        onClick={() => setFilter('all')}
      >
        All
      </button>
    </div>
  );

  return (
    <>
      <ModuleHeader title="Registers" />
      <CurrentCategory />
      <ul className="register-list">
        {filteredRegisters.map((r) => (
          <li className="register-row" key={`reg-${r.abiName}`}>
            <span className="register-name">{r.name}</span>
            <span className="register-abi">{r.abiName}</span>
            <span className="register-value">{`${(r.value >>> 0).toString(16)}`}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RegisterPanel;
