import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  const getButtonClass = (type) => (type === filter ? 'btn-active' : undefined);

  const Button = ({ classifier }) => (
    <button
      className={getButtonClass(classifier)}
      type="button"
      onClick={() => setFilter(classifier)}
    >
      {classifier}
    </button>
  );

  Button.propTypes = {
    classifier: PropTypes.string.isRequired,
  };

  const CurrentCategory = () => (
    <div className="btn-group" role="group">
      <Button classifier="all" />
      <Button classifier="caller-saved" />
      <Button classifier="callee-saved" />
    </div>
  );

  return (
    <>
      <ModuleHeader title="Registers" />
      <CurrentCategory />
      <ul className="register-list">
        {registersAppended.map((r) => {
          const disabledClass = !filteredRegisters.includes(r) && 'register-disabled';

          return (
            <li className={`register-row ${disabledClass}`} key={`reg-${r.abiName}`}>
              <span className={`register-name ${disabledClass}`}>{r.name}</span>
              <span className={`register-abi ${disabledClass}`}>{r.abiName}</span>
              <span className={`register-value ${disabledClass}`}>{`${(r.value >>> 0).toString(16)}`}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RegisterPanel;
