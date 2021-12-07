import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Board from './components/board';
import Volume from './components/volume';
import {isPlaceable, calculateWinner, audioPlay} from './components/utils.js';

// TODO: draw check, Board grid

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(42).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      isEnter: false,
      isDraw: false,
      volume: 1
    }
  }

  handleClick(i) {
    if (!this.state.isEnter || this.state.isDraw)
      return;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const place = isPlaceable(squares, i);
    if (calculateWinner(squares, 0) || place === null) {
      return;
    }
    squares[place] = this.state.xIsNext ? 'X'  : 'O';
    if (this.state.stepNumber === 41)
      this.setState({
        isDraw: true
      })
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

  toggleVolume() {
    let newVolume;
    if (this.state.volume === 1) {
      newVolume = 0.5;
    } else if (this.state.volume === 0.5) {
      newVolume = 0;
    } else {
      newVolume = 1;
    }
    console.log(newVolume);
    this.setState({
      volume: newVolume
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, 0);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    if (this.state.isDraw)
      status = 'Draw'

    const onGame = this.state.isEnter ? " board-on" : "";

    return (
      <div className="game">
          <div className="game-title">
            <span className="neon flash">電<span>電</span></span>
            <span className="neon flash">脳<span>脳</span></span>
            <span className="neon flash">盤<span>盤</span></span>
            <span className="neon flash">上<span>上</span></span>
            <span className="neon flash">娯<span>娯</span></span>
            <span className="neon flash">楽<span>楽</span></span>
            <span className="neon flash">&nbsp;<span>&nbsp;</span></span>
            <span className="neon flash">四<span>四</span></span>
            <span className="neon flash">子<span>子</span></span>
            <span className="neon flash">棋<span>棋</span></span>
          </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="enter-button"
          onClick={() => {
            audioPlay("audio/switch.mp3", this.state.volume);
            this.jumpTo(0);}}>
          RESET
          </button>
          <Volume
            volume={this.state.volume}
            onClick={() => {
              this.toggleVolume();
              audioPlay("audio/switch.mp3", this.state.volume);
            }}
          ></Volume>
          <button className="enter-button"
            onClick={() => {
              if (!this.state.isEnter) {
                audioPlay("audio/bell_sound.mp3", this.state.volume);
                this.setState({isEnter : true});
              }
            }}> 入場 ☞ </button>
        </div>
        <div className="game-body">
          <div className={"game-board" + onGame}>
            <Board 
              squares={current.squares}
              onClick={(i) => {
                if (this.state.isEnter)
                  audioPlay("audio/switch.mp3", this.state.volume);
                this.handleClick(i);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
