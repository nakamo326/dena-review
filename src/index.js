import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './mobile.css';

import Title from './components/title';
import Indicator from './components/indicator';
import Volume from './components/volume';
import Board from './components/board';
import { isPlaceable, calculateWinner, audioPlay } from './components/utils';

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(42).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const [isEnter, setIsEnter] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [socket, setSocket] = useState(null);
  // socketがnullかどうかを対戦モードかどうかの判定に使う

  const toggleVolume = useCallback(() => {
    audioPlay('audio/switch.mp3', volume);
    let newVolume;
    switch (volume) {
      case 1:
        newVolume = 0.5;
        break;
      case 0.5:
        newVolume = 0;
        break;
      default:
        newVolume = 1;
        break;
    }
    setVolume(newVolume);
  }, [volume]);

  const handleClick = (i) => {
    if (!isEnter || isDraw) return;
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = newHistory[newHistory.length - 1].squares.slice();
    const place = isPlaceable(squares, i);
    if (calculateWinner(squares, 0) || place === null) {
      return;
    }
    squares[place] = xIsNext ? 'X' : 'O';
    const winnerStreak = calculateWinner(squares, 0);
    const winner = winnerStreak ? squares[winnerStreak[0]] : null;
    if (winnerStreak) {
      for (let i = 0; i < squares.length; i++) {
        const match = winnerStreak.includes(i);
        squares[i] = match ? winner : null;
      }
    }
    if (!winnerStreak && stepNumber === 41) {
      setIsDraw(true);
    }
    setHistory(
      history.concat([
        {
          squares: squares,
        },
      ]),
    );
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    setIsDraw(false);
    jumpTo(0);
  };

  // websocket test
  const connectWebsocket = () => {
    const ws = new WebSocket('wss://murmuring-lowlands-58469.herokuapp.com');
    ws.addEventListener('open', (e) => {
      console.log('get connection with server!');
      ws.send('message from client!');
    });
    setSocket(ws);
  };

  const sendMessage = () => {
    socket.send('massage from client!');
  };

  const current = history[stepNumber];
  const winner_streak = calculateWinner(current.squares, 0);
  const winner = winner_streak ? current.squares[winner_streak[0]] : null;

  return (
    <div className="game">
      <Title />
      <div className="game-info">
        <Indicator xIsNext={xIsNext} isDraw={isDraw} winner={winner} />
        <button
          className="reset-button"
          onClick={() => {
            audioPlay('audio/switch.mp3', volume);
            resetGame();
          }}>
          RESET
        </button>
        <Volume volume={volume} onClick={toggleVolume} />
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
          <Board
            squares={current.squares}
            onClick={(i) => {
              if (isEnter) audioPlay('audio/switch.mp3', volume);
              handleClick(i);
            }}
          />
        </div>
      </div>
      <input type="text" name="roomId" placeholder="Enter" />
      <button onClick={() => connectWebsocket()}>connectWebsocket</button>
      <button onClick={() => sendMessage()}>sendMassage</button>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
