import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class BoardRow extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board-row">
        {this.renderSquare(this.props.index * 7 + 0)}
        {this.renderSquare(this.props.index * 7 + 1)}
        {this.renderSquare(this.props.index * 7 + 2)}
        {this.renderSquare(this.props.index * 7 + 3)}
        {this.renderSquare(this.props.index * 7 + 4)}
        {this.renderSquare(this.props.index * 7 + 5)}
        {this.renderSquare(this.props.index * 7 + 6)}
      </div>
    )
  }
}

class Board extends React.Component {
  render() {
    return (
      <div>
        <BoardRow
          index={0}
          squares={this.props.squares}
          onClick={(i) =>this.props.onClick(i)}
        />
        <BoardRow
          index={1}
          squares={this.props.squares}
          onClick={(i) =>this.props.onClick(i)}
        />
        <BoardRow
          index={2}
          squares={this.props.squares}
          onClick={(i) =>this.props.onClick(i)}
        />
        <BoardRow
          index={3}
          squares={this.props.squares}
          onClick={(i) =>this.props.onClick(i)}
        />
        <BoardRow
          index={4}
          squares={this.props.squares}
          onClick={(i) =>this.props.onClick(i)}
        />
        <BoardRow
          index={5}
          squares={this.props.squares}
          onClick={(i) =>this.props.onClick(i)}
        />
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
        squares: Array(42).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  // need to fix
  // set stone to most below row
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const place = isPlaceable(squares, i);
    if (calculateWinner(squares, 0) || place === null) {
      return;
    }
    squares[place] = this.state.xIsNext ? 'X'  : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
  });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, 0);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-title"></div>
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

//  return placeable index number, if stone is full on col return null
function isPlaceable(squares, i) {
  const col = i % 7;
  for (let row = 0; row < 6; row++) {
    const index = row * 7 + col;
    if (squares[index] !== null) {
      if (row === 0)
      return null;
      else
      return index - 7;
    }
  }
  return col + 35;
}

// need to fix

function calculateWinner(squares, index) {
  if (index === 42) {
    return null;
  }
  if (squares[index] === null)
    return calculateWinner(squares, index + 1);

  const directionList =[
    [0,1], [-1,1], [-1,0], [-1,-1], [0,-1], [1,-1], [1,0], [1,1]
  ];// 右,  右上,     上,     左上,     左,     左下,   下、    右下
  const row = index / 7;
  const col = index % 7;
  for (let i = 0; i < 8; i++) {
    if ((col === 0 && i >= 3 && i <= 5) || (row === 0 && i >= 1 && i <= 3) 
      ||(col === 6 && (i <= 1 || i == 7)) || (row === 5 && i >= 6 && i <= 8))
      continue;
    
  }
}

