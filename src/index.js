import React from 'react';
import ReactDOM from 'react-dom';
import RegisterPanel from './components/Registers';


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
