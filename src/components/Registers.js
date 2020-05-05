import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import RegMenu from './RegMenu';
import useCPU from '../hooks/use-cpu';


import getRegisters from '../utils/registers';

const RegisterPanel = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <h1>Loading...</h1>;
  }

  const allRegisters = getRegisters();

  const registersAppended = cpu.registers.map((reg, i) => (
    { ...allRegisters[i], value: reg.low_ }
  ));

  return (
    <RegMenu registers={registersAppended} />
  );
};

// RegisterPanel.propTypes = {
//   registers: PropTypes.arrayOf(PropTypes.shape({
//     low_: PropTypes.number,
//     high_: PropTypes.number,
//   })).isRequired,
// };

ReactDOM.render(<RegisterPanel />, document.querySelector('#registerPanel'));

export default RegisterPanel;
