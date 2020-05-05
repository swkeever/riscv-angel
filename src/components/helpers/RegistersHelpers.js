import React from 'react';

// helper
const getCallerSaved = (registers) => (
  registers.filter((reg) => reg.saver === 'Caller').map((reg) => (
    <li key={reg.name}>
      { reg.name }
      (
      {reg.abiName}
      )
      :
      { reg.value}
    </li>
  ))
);

// helper
const getCalleeSaved = (registers) => (
  registers.filter((reg) => reg.saver === 'Callee').map((reg) => (
    <li key={reg.name}>
      { reg.name }
      (
      {reg.abiName}
      )
      :
      { reg.value}
    </li>
  ))
);

// helper
const getAllRegisters = (registers) => (
  registers.map((reg) => (
    <li key={reg.name}>
      { reg.name }
      (
      {reg.abiName}
      )
      :
      { reg.value}
    </li>
  ))
);

export {
  getAllRegisters,
  getCalleeSaved,
  getCallerSaved,
};
