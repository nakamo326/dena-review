import { useState } from 'react';

export function useStepNumber(): [number, boolean, () => void, (s: number) => void] {
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const incStepNumber = () => {
    setStepNumber((stepNumber) => stepNumber + 1);
    setXIsNext(!xIsNext);
  };

  const updateStepNumber = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  return [stepNumber, xIsNext, incStepNumber, updateStepNumber];
}

// export function useGameState() {
//   const [history, setHistory] = useState([
//       Array(42).fill(null),
//   ]);
//   const [isDraw, setIsDraw] = useState(false);
//   // winner
//   const [winner, setWinner] = useState(null);
//   // winnner streak
//   const [winnerStreak, setWinnerStreak] = useState(null);

//   const updateHistory(squares: Array<string>) => {
//     const tmpHistory = history.slice(0, )
//     setHistory()
//   }

// }
