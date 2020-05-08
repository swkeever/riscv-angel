import React from 'react';
import ReactDOM from 'react-dom';
import RegisterPanel from './components/RegisterPanel';
import InstructionDisplay from './components/InstructionDisplay';

// const App = () => {
//   const cpu = useCPU();

//   if (!cpu) {
//     return <h1>Loading...</h1>;
//   }

//   console.log(cpu);

//   return (
//     <>
//       <h1>hello world</h1>
//       <RegisterPanel registers={cpu.registers} />
//     </>
//   );
// };

ReactDOM.render(<RegisterPanel />, document.querySelector('#registerPanel'));
ReactDOM.render(<InstructionDisplay />, document.querySelector('#instructionDisplay'));
