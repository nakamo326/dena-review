import Stone from './stone';

export function BoardRow(props) {
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
}

export default function Board(props) {
  return (
    <div>
      {[0, 1, 2, 3, 4, 5].map((id) => (
        <BoardRow key={id} row={id} squares={props.squares} onClick={(i) => props.onClick(i)} />
      ))}
    </div>
  );
}
