import React from 'react';
import Stone from './stone';

class BoardRow extends React.Component {
  renderStone(i) {
    return <Stone value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div className="board-row">
        {this.renderStone(this.props.index * 7 + 0)}
        {this.renderStone(this.props.index * 7 + 1)}
        {this.renderStone(this.props.index * 7 + 2)}
        {this.renderStone(this.props.index * 7 + 3)}
        {this.renderStone(this.props.index * 7 + 4)}
        {this.renderStone(this.props.index * 7 + 5)}
        {this.renderStone(this.props.index * 7 + 6)}
      </div>
    );
  }
}

export function Board(props) {
  return (
    <div>
      <BoardRow index={0} squares={props.squares} onClick={(i) => props.onClick(i)} />
      <BoardRow index={1} squares={props.squares} onClick={(i) => props.onClick(i)} />
      <BoardRow index={2} squares={props.squares} onClick={(i) => props.onClick(i)} />
      <BoardRow index={3} squares={props.squares} onClick={(i) => props.onClick(i)} />
      <BoardRow index={4} squares={props.squares} onClick={(i) => props.onClick(i)} />
      <BoardRow index={5} squares={props.squares} onClick={(i) => props.onClick(i)} />
    </div>
  );
}

export default Board;
