import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getAllRegisters,
  getCalleeSaved,
  getCallerSaved,
} from './helpers/RegistersHelpers';

const RegMenu = ({ registers }) => {
  const [filter, setFilter] = useState('all');

  const CurrentCategory = () => (
    (
      <div className="btn-group" role="group">
        <button type="submit" onClick={() => setFilter('callee-saved')}>
          Callee-saved
        </button>
        <button type="submit" onClick={() => setFilter('caller-saved')}>
          Caller-saved
        </button>
        <button type="submit" onClick={() => setFilter('all')}>
          All
        </button>
      </div>
    )
  );

  switch (filter) {
    case 'callee-saved':
      return (
        <>
          <CurrentCategory />
          {getCalleeSaved(registers)}
        </>
      );
    case 'caller-saved':
      return (
        <>
          <CurrentCategory />
          {getCallerSaved(registers)}
        </>
      );
    default:
      return (
        <>
          <CurrentCategory />
          {getAllRegisters(registers)}
        </>
      );
  }


  // if (filter === 'all') {
  //   return (
  //     <>
  //       <CurrentCategory />
  //       {getAllRegisters(registers)}
  //     </>
  //   );
  // }
  // if (filter === 'callee-saved') {
  //   return (
  //     <>
  //       <CurrentCategory />
  //       {getCalleeSaved(registers)}
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <CurrentCategory />
  //     {getCallerSaved(registers)}
  //   </>
  // );
};

RegMenu.propTypes = {
  registers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RegMenu;
