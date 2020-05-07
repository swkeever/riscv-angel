import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RegMenu = ({ registers }) => {
  const [filter, setFilter] = useState('all');

  const getFilteredRegisters = () => {
    switch (filter) {
      case 'callee-saved':
        return registers.filter((r) => r.saver === 'Callee');
      case 'caller-saved':
        return registers.filter((r) => r.saver === 'Caller');
      case 'all':
        return registers;
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

RegMenu.propTypes = {
  registers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RegMenu;
