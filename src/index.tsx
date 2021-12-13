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
  const [history, setHistory] = useState([Array(42).fill(null)]);
  const [volume, setVolume] = useState(0.5);
  const [isEnter, setIsEnter] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [stepNumber, xIsNext, incStepNumber, updateStepNumber] = useStepNumber();

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = newHistory[newHistory.length - 1].slice();
    const place = isPlaceable(squares, i);
    if (!isEnter || isDraw || calculateWinner(squares, 0) || place === null) {
      audioPlay('audio/disable.mp3', volume);
      return;
    }
    audioPlay('audio/switch.mp3', volume);
    squares[place] = xIsNext ? 'X' : 'O';
    const winStreak = calculateWinner(squares, 0);
    const winner = winStreak ? squares[winStreak[0]] : null;
    if (winStreak) {
      for (let i = 0; i < squares.length; i++) {
        squares[i] = winStreak.includes(i) ? winner : null;
      }
    }
    newHistory.push(squares);
    let newIsDraw = false;
    if (!winStreak && stepNumber === 41) {
      newIsDraw = true;
    }
    setIsDraw(newIsDraw);
    setHistory(newHistory);
    incStepNumber();
  };

  const resetGame = () => {
    audioPlay('audio/switch.mp3', volume);
    setIsDraw(false);
    updateStepNumber(0);
  };

  const current = history[stepNumber];
  const winStreak = calculateWinner(current, 0);
  const winner = winStreak ? current[winStreak[0]] : null;

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
          <Board squares={current} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

// ========================================
ReactDOM.render(<Game />, document.getElementById('root'));
