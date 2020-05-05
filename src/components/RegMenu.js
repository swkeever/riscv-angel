import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getAllRegisters,
  getCalleeSaved,
  getCallerSaved,
} from './helpers/RegMenuHelpers';

const RegMenu = ({ registers }) => {
  const [filter, setFilter] = useState('all');

  const CurrentCategory = () => (
    (
      <>
        <button type="submit" onClick={() => setFilter('callee-saved')}>
          callee-saved
        </button>
        <button type="submit" onClick={() => setFilter('caller-saved')}>
          caller-saved
        </button>
        <button type="submit" onClick={() => setFilter('all')}>
          all
        </button>
      </>
    )
  );

  if (filter === 'all') {
    return (
      <>
        <CurrentCategory />
        {getAllRegisters(registers)}
      </>
    );
  }
  if (filter === 'callee-saved') {
    return (
      <>
        <CurrentCategory />
        {getCalleeSaved(registers)}
      </>
    );
  }

  return (
    <>
      <CurrentCategory />
      {getCallerSaved(registers)}
    </>
  );
};

RegMenu.propTypes = {
  registers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RegMenu;
