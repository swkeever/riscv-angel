import React from 'react';
import PropTypes from 'prop-types';
// import Category from './Category';
import RegMenu from './RegMenu';
// import {
//   Pointers,
//   Temporary,
//   CalleeSaved,
//   Arguments,
// } from '../utils/constants';

import getRegisters from '../utils/registers';

const RegisterPanel = ({ registers }) => {
  const allRegisters = getRegisters();

  const registersAppended = registers.map((reg, i) => (
    { ...allRegisters[i], value: reg.low_ }
  ));

  return (
    <>
      <RegMenu registers={registersAppended} />
    </>
  );
};

RegisterPanel.propTypes = {
  registers: PropTypes.arrayOf(PropTypes.shape({
    low_: PropTypes.number,
    high_: PropTypes.number,
  })).isRequired,
};

export default RegisterPanel;
