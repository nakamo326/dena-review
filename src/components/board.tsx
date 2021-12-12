import React from 'react';
import Stone from './stone';

type BoardRowProps = {
  squares: Array<string>;
  onClick: (arg0: number) => void;
  row: number;
};

type BoardProps = {
  squares: Array<string>;
  onClick: (arg0: number) => void;
};

const BoardRow = (props: BoardRowProps) => {
  return (
    <div className="board-row">
      {[0, 1, 2, 3, 4, 5, 6].map((col) => (
        <Stone
          key={col}
          value={props.squares[props.row * 7 + col]}
          onClick={() => props.onClick(col)}
        />
      ))}
    </div>
  );
};

const Board = (props: BoardProps): JSX.Element => {
  return (
    <div>
      {[0, 1, 2, 3, 4, 5].map((id) => (
        <BoardRow key={id} row={id} squares={props.squares} onClick={(i) => props.onClick(i)} />
      ))}
    </div>
  );
};

export default Board;
