import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './mobile.css';

import Title from './components/title';
import Indicator from './components/indicator';
import Volume from './components/volume';
import Board from './components/board';
import { useStepNumber } from './components/useStepNumber';
import { isPlaceable, calculateWinner, audioPlay } from './components/utils';

// socket timeout check

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(42).fill(null),
    },
  ]);
  const [volume, setVolume] = useState(0.5);
  const [isEnter, setIsEnter] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [stepNumber, xIsNext, incStepNumber, updateStepNumber] = useStepNumber();

  const handleClick = (i: number) => {
    console.log('call handleClick!');
    if (!isEnter || isDraw) {
      audioPlay('audio/disable.mp3', volume);
      console.log('but return..');
      return;
    }
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = newHistory[newHistory.length - 1].squares.slice();
    const place = isPlaceable(squares, i);
    if (calculateWinner(squares, 0) || place === null) {
      return;
    }
    audioPlay('audio/switch.mp3', volume);
    squares[place] = xIsNext ? 'X' : 'O';
    console.log(squares);
    console.log('step number: ' + stepNumber);
    const winnerStreak = calculateWinner(squares, 0);
    const winner = winnerStreak ? squares[winnerStreak[0]] : null;
    if (winnerStreak) {
      for (let i = 0; i < squares.length; i++) {
        const match = winnerStreak.includes(i);
        squares[i] = match ? winner : null;
      }
    }
    let newIsDraw = false;
    if (!winnerStreak && stepNumber === 41) {
      newIsDraw = true;
    }
    setIsDraw(newIsDraw);
    setHistory(
      newHistory.concat([
        {
          squares: squares,
        },
      ]),
    );
    incStepNumber();
  };

  const resetGame = () => {
    audioPlay('audio/switch.mp3', volume);
    setIsDraw(false);
    updateStepNumber(0);
  };

  const current = history[stepNumber];
  const winner_streak = calculateWinner(current.squares, 0);
  const winner = winner_streak ? current.squares[winner_streak[0]] : null;

  return (
    <div className="game">
      <Title />
      <div className="game-info">
        <Indicator xIsNext={xIsNext} isDraw={isDraw} winner={winner} />
        <button className="reset-button" onClick={resetGame}>
          RESET
        </button>
        <Volume volume={volume} setVolume={setVolume} />
        <button
          className="enter-button"
          onClick={() => {
            if (!isEnter) {
              audioPlay('audio/bell_sound.mp3', volume);
              setIsEnter(true);
            }
          }}>
          入場 ☞
        </button>
      </div>
      <div className="game-body">
        <div className={'game-board' + (isEnter ? ' board-on' : '')}>
          <Board squares={current.squares} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

// ========================================
ReactDOM.render(<Game />, document.getElementById('root'));
