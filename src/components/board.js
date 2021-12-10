import Stone from './stone';

export function BoardRow(props) {
  return (
    <div className="board-row">
      {[0, 1, 2, 3, 4, 5, 6].map((j) => (
        <Stone
          key={j}
          value={props.squares[props.i * 7 + j]}
          onClick={() => props.onClick(props.i * 7 + j)}
        />
      ))}
    </div>
  );
}

export default function Board(props) {
  return (
    <div>
      {[0, 1, 2, 3, 4, 5].map((id) => (
        <BoardRow key={id} i={id} squares={props.squares} onClick={(j) => props.onClick(j)} />
      ))}
    </div>
  );
}
