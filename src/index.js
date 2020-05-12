import React from 'react';
import ReactDOM from 'react-dom';
import RegisterPanel from './components/RegisterPanel';
import InstructionDisplay from './components/InstructionDisplay';
import MiscellaneousPanel from './components/MiscellaneousPanel';


ReactDOM.render(<RegisterPanel />, document.querySelector('#registerPanel'));
ReactDOM.render(<InstructionDisplay />, document.querySelector('#instructionDisplay'));
ReactDOM.render(<MiscellaneousPanel />, document.querySelector('#miscellaneousPanel'));
