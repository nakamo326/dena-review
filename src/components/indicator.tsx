import React, { useCallback } from 'react';
import Stone from './stone';

type DataProps = {
  xIsNext: boolean;
  isDraw: boolean;
  winner: string | null;
};

const Indicator = React.memo((props: DataProps) => {
  const voidFunc = useCallback(() => {}, []);
  let status;
  let left: string | null = null;
  let right: string | null  = null;
  if (props.winner) {
    status = props.winner;
  } else {
    status = props.xIsNext ? 'X' : 'O';
  }
  if (!props.isDraw) {
    if (status === 'X') {
      left = status;
    } else {
      right = status;
    }
  }
  return (
    <div className="indicator">
      <Stone value={left} onClick={voidFunc}></Stone>
      <Stone value={right} onClick={voidFunc}></Stone>
    </div>
  );
});

export default Indicator;
