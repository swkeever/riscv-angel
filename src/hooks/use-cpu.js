import { useState } from 'react';
import useInterval from './use-interval';
import { CLOCK_CYCLE } from '../utils/constants';

function useCPU() {
  const [cpu, setCpu] = useState(null);

  useInterval(() => {
    setCpu(window.myCpu);
  }, CLOCK_CYCLE);

  if (!cpu) {
    return null;
  }

  return cpu;
}

export default useCPU;
