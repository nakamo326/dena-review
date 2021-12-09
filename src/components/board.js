import React from 'react';
import Stone from './stone';

class BoardRow extends React.Component {
  renderStone(i) {
    return <Stone value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div className="board-row">
        {[0, 1, 2, 3, 4, 5, 6].map((j) => this.renderStone(this.props.i * 7 + j))}
      </div>
    );
  }
}

export function Board(props) {
  return (
    <div>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <BoardRow i={i} squares={props.squares} onClick={(j) => props.onClick(j)} />
      ))}
    </div>
  );
}

export default Board;
