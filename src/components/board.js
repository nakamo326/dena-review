import React from "react";
import "../index.css";
import Stone from "./stone";

class BoardRow extends React.Component {
  renderStone(i) {
    return (
      <Stone
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
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

class Board extends React.Component {
  render() {
    return (
      <div>
        <BoardRow
          index={0}
          squares={this.props.squares}
          onClick={(i) => this.props.onClick(i)}
        />
        <BoardRow
          index={1}
          squares={this.props.squares}
          onClick={(i) => this.props.onClick(i)}
        />
        <BoardRow
          index={2}
          squares={this.props.squares}
          onClick={(i) => this.props.onClick(i)}
        />
        <BoardRow
          index={3}
          squares={this.props.squares}
          onClick={(i) => this.props.onClick(i)}
        />
        <BoardRow
          index={4}
          squares={this.props.squares}
          onClick={(i) => this.props.onClick(i)}
        />
        <BoardRow
          index={5}
          squares={this.props.squares}
          onClick={(i) => this.props.onClick(i)}
        />
      </div>
    );
  }
}

export default Board;
