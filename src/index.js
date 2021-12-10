import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './mobile.css';

import Title from './components/title';
import Indicator from './components/indicator';
import Volume from './components/volume';
import Board from './components/board';
import { isPlaceable, calculateWinner, audioPlay } from './components/utils';

// socket timeout check

const Game = () => {
  const SERVER_URL = 'wss://murmuring-lowlands-58469.herokuapp.com';
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
  const [isMyTurn, setIsMyTurn] = useState(false);

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

  const handleClick = useCallback(
    (i) => {
      console.log('call handleClick!');
      if (!isEnter || isDraw || (socket && !isMyTurn)) {
        audioPlay('audio/disable.mp3', volume);
        console.log('but return..');
        return;
      }
      const newHistory = history.slice(0, stepNumber + 1);
      const squares = newHistory[newHistory.length - 1].squares.slice();
      const place = isPlaceable(squares, i);
      if (calculateWinner(squares, 0) || !place) {
        return;
      }
      audioPlay('audio/switch.mp3', volume);
      if (socket && isMyTurn) {
        socket.send(JSON.stringify({ type: 'set', col: i }));
        setIsMyTurn(false);
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
        newHistory.concat([
          {
            squares: squares,
          },
        ]),
      );
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
    },
    [isMyTurn, isEnter, isDraw, history, stepNumber, xIsNext, volume, socket],
  );

  const handleMassage = useCallback(
    (i) => {
      console.log('call handleMessage!');
      if (!isEnter || isDraw || (socket && isMyTurn)) {
        audioPlay('audio/disable.mp3', volume);
        console.log('but return..');
        return;
      }
      const newHistory = history.slice(0, stepNumber + 1);
      const squares = newHistory[newHistory.length - 1].squares.slice();
      const place = isPlaceable(squares, i);
      if (calculateWinner(squares, 0) || !place) {
        return;
      }
      audioPlay('audio/switch.mp3', volume);
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
        newHistory.concat([
          {
            squares: squares,
          },
        ]),
      );
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
      setIsMyTurn(true);
    },
    [isMyTurn, isEnter, isDraw, history, stepNumber, xIsNext, volume, socket],
  );

  useEffect(() => {
    if (socket) {
      socket.addEventListener('message', (m) => {
        const json = JSON.parse(m.data);
        const type = json.type;
        console.log(json);

        switch (type) {
          case 'init':
            if (json.opponent) {
              console.log('game start!');
              setIsEnter(true);
              setIsMyTurn(json.isYourTurn);
            } else {
              setIsMyTurn(false);
              console.log('waiting opponent player...');
            }
            break;
          case 'set':
            handleMassage(json.col);
            break;
          case 'end':
            socket.close();
            break;
          default:
            break;
        }
      });
    }
  }, [isMyTurn, socket, handleMassage]);

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    audioPlay('audio/switch.mp3', volume);
    setIsDraw(false);
    jumpTo(0);
  };

  const connectWebsocket = (id) => {
    const ws = new WebSocket(SERVER_URL);
    ws.addEventListener('open', (e) => {
      console.log('get connection with server!');
      ws.send(JSON.stringify({ type: 'init', roomId: id }));
    });
    setSocket(ws);
  };

  // maybe server problems
  const current = history[stepNumber];
  console.log(current);
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
          <Board squares={current.squares} onClick={handleClick} />
        </div>
      </div>
      <input type="text" name="roomId" placeholder="Enter" />
      <button disabled={isMyTurn} onClick={() => connectWebsocket(345)}>
        connectWebsocket
      </button>
      <p>{isMyTurn ? 'YOUR TURN' : 'WAIT OPPONENT TURN or NOT REMOTE GAME'}</p>
    </div>
  );
};

// ========================================
ReactDOM.render(<Game />, document.getElementById('root'));
