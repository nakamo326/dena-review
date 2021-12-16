import { useState } from 'react';

export function useStepNumber(): [number, boolean, () => void, (s: number) => void] {
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const incStepNumber = () => {
    setStepNumber((stepNumber) => stepNumber + 1);
    setXIsNext((xIsNext) => !xIsNext);
  };

  const updateStepNumber = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  return [stepNumber, xIsNext, incStepNumber, updateStepNumber];
}
