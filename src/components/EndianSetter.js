import React from 'react';
import useCPU from '../hooks/use-cpu';
import Loader from './Loader';

const EndianSetter = () => {
  const cpu = useCPU();

  if (!cpu) {
    return <Loader />;
  }

  return (
    <p> lmao </p>
  );
};

export default EndianSetter;
