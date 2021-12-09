import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './mobile.css';

import Title from './components/title';
import Indicator from './components/indicator';
import Volume from './components/volume';
import Board from './components/board';
import { isPlaceable, calculateWinner, audioPlay } from './components/utils';
import { enterRoom, openRoom } from './components/p2p';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(42).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isEnter: false,
      isDraw: false,
      volume: 0.5,
      peer: null,
    };
  }

  handleClick(i) {
    if (!this.state.isEnter || this.state.isDraw) return;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const place = isPlaceable(squares, i);
    if (calculateWinner(squares, 0) || place === null) {
      return;
    }
    squares[place] = this.state.xIsNext ? 'X' : 'O';
    if (this.state.stepNumber === 41)
      this.setState({
        isDraw: true,
      });

    const winner_streak = calculateWinner(squares, 0);
    const winner = winner_streak ? squares[winner_streak[0]] : null;
    if (winner_streak) {
      for (let i = 0; i < squares.length; i++) {
        const match = winner_streak.includes(i);
        squares[i] = match ? winner : null;
      }
    }

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  resetGame() {
    this.setState({
      isDraw: false,
    });
    this.jumpTo(0);
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
      volume: newVolume,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner_streak = calculateWinner(current.squares, 0);
    const winner = winner_streak ? current.squares[winner_streak[0]] : null;
    const onGame = this.state.isEnter ? ' board-on' : '';

    return (
      <div className="game">
        <Title />
        <div className="game-info">
          <Indicator xIsNext={this.state.xIsNext} isDraw={this.state.isDraw} winner={winner} />
          <button
            className="reset-button"
            onClick={() => {
              audioPlay('audio/switch.mp3', this.state.volume);
              this.resetGame();
            }}>
            RESET
          </button>
          <Volume
            volume={this.state.volume}
            onClick={() => {
              this.toggleVolume();
              audioPlay('audio/switch.mp3', this.state.volume);
            }}
          />
          <button
            className="enter-button"
            onClick={() => {
              if (!this.state.isEnter) {
                audioPlay('audio/bell_sound.mp3', this.state.volume);
                this.setState({ isEnter: true });
              }
            }}>
            入場 ☞
          </button>
        </div>
        <div className="game-body">
          <div className={'game-board' + onGame}>
            <Board
              squares={current.squares}
              onClick={(i) => {
                if (this.state.isEnter) audioPlay('audio/switch.mp3', this.state.volume);
                this.handleClick(i);
              }}
            />
          </div>
        </div>
        <input type="text" name="roomId" placeholder="Enter" />
        <button onClick={() => openRoom('000')}>openRoom</button>
        <button onClick={() => enterRoom('000')}>enterRoom</button>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
