import { useState } from 'react';
import useInterval from './use-interval';

function setEndianness(option) {
  const [endian, setEndian] = useState('little');

  useInterval(() => {
    if (window.myWorker) {
      window.myWorker.postMessage({ type: 'setEndianness', inp: option});
    }
    setCpu(window.myCpu);
  }, 1000);

  if (!cpu) {
    return null;
  }

  return cpu;
}

export default useCPU;