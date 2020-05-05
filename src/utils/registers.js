// data scraped from https://en.wikichip.org/wiki/risc-v/registers
const registers = [
  {
    name: 'x0',
    abiName: 'zero',
    description: 'hardwired zero',
    saver: null,
  },
  {
    name: 'x1',
    abiName: 'ra',
    description: 'return address',
    saver: 'Caller',
  },
  {
    name: 'x2',
    abiName: 'sp',
    description: 'stack pointer',
    saver: 'Callee',
  },
  {
    name: 'x3',
    abiName: 'gp',
    description: 'global pointer',
    saver: null,
  },
  {
    name: 'x4',
    abiName: 'tp',
    description: 'thread pointer',
    saver: null,
  },
  {
    name: 'x5',
    abiName: 't0',
    description: 'temporary register',
    saver: 'Caller',
  },
  {
    name: 'x6',
    abiName: 't1',
    description: 'temporary register',
    saver: 'Caller',
  },
  {
    name: 'x7',
    abiName: 't2',
    description: 'temporary register',
    saver: 'Caller',
  },
  {
    name: 'x8',
    abiName: 's0 / fp',
    description: 'saved register / frame pointer',
    saver: 'Callee',
  },
  {
    name: 'x9',
    abiName: 's1',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x10',
    abiName: 'a0',
    description: 'function argument / return value',
    saver: 'Caller',
  },
  {
    name: 'x11',
    abiName: 'a1',
    description: 'function argument / return value',
    saver: 'Caller',
  },
  {
    name: 'x12',
    abiName: 'a2',
    description: 'function argument',
    saver: 'Caller',
  },
  {
    name: 'x13',
    abiName: 'a3',
    description: 'function argument',
    saver: 'Caller',
  },
  {
    name: 'x14',
    abiName: 'a4',
    description: 'function argument',
    saver: 'Caller',
  },
  {
    name: 'x15',
    abiName: 'a5',
    description: 'function argument',
    saver: 'Caller',
  },
  {
    name: 'x16',
    abiName: 'a6',
    description: 'function argument',
    saver: 'Caller',
  },
  {
    name: 'x17',
    abiName: 'a7',
    description: 'function argument',
    saver: 'Caller',
  },
  {
    name: 'x18',
    abiName: 's2',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x19',
    abiName: 's3',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x20',
    abiName: 's4',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x21',
    abiName: 's5',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x22',
    abiName: 's6',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x23',
    abiName: 's7',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x24',
    abiName: 's8',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x25',
    abiName: 's9',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x26',
    abiName: 's10',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x27',
    abiName: 's11',
    description: 'saved register',
    saver: 'Callee',
  },
  {
    name: 'x28',
    abiName: 't3',
    description: 'temporary register',
    saver: 'Caller',
  },
  {
    name: 'x29',
    abiName: 't4',
    description: 'temporary register',
    saver: 'Caller',
  },
  {
    name: 'x30',
    abiName: 't5',
    description: 'temporary register',
    saver: 'Caller',
  },
  {
    name: 'x31',
    abiName: 't6',
    description: 'temporary register',
    saver: 'Caller',
  },
];

const getTemporaryRegisters = () => registers.filter((r) => r.abiName.startsWith('t'));

const getCalleeSaved = () => registers.filter((r) => r.saver === 'Callee');

const getCallerSaved = () => registers.filter((r) => r.saver === 'Caller');

const getFunctionArguments = () => registers.filter((r) => r.abiName.startsWith('a'));

const getPointers = () => registers.filter((r) => r.description.includes('pointer'));

export {
  registers,
  getTemporaryRegisters,
  getCalleeSaved,
  getCallerSaved,
  getFunctionArguments,
  getPointers,
};
