import React from 'react';
import ReactDOM from 'react-dom';
import RegisterPanel from './components/RegisterPanel';
import InstructionPanel from './components/InstructionPanel';
import MemoryPanel from './components/MemoryPanel';

ReactDOM.render(<RegisterPanel />, document.querySelector('#registerPanel'));
ReactDOM.render(<InstructionPanel />, document.querySelector('#instructionPanel'));
ReactDOM.render(<MemoryPanel />, document.querySelector('#memoryPanel'));
