import React from 'react';
import ReactDOM from 'react-dom';
import RegisterPanel from './components/RegisterPanel';
import InstructionDisplay from './components/InstructionDisplay';

ReactDOM.render(<RegisterPanel />, document.querySelector('#registerPanel'));
ReactDOM.render(<InstructionDisplay />, document.querySelector('#instructionDisplay'));
