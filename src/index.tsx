import React, { useCallback, useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import ReactDOM from 'react-dom';
import './index.css';
import './mobile.css';
import './components/remotePlay.d.ts';

import Title from './components/title';
import Indicator from './components/indicator';
import Volume from './components/volume';
import Board from './components/board';
import { isPlaceable, calculateWinner, audioPlay } from './components/utils';
import { enterRoom } from './components/remotePlay';

// socket timeout check

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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [status, setStatus] = useState('');

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

  const handleClick = (i: number) => {
    console.log('call handleClick!');
    if (!isEnter || isDraw || (socket && !isMyTurn)) {
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
    console.log('stepnumber: ' + stepNumber);
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
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    let newStatus = '';
    if (socket) {
      socket.emit('set', JSON.stringify({ roomId: roomId, userId: userId, col: i }));
      newStatus = 'Wait opponent turn...';
    }
    setIsMyTurn(false);
    setStatus(newStatus);
  };

  const handleMessage = useCallback(
    (i: number) => {
      console.log('call handleMessage!');
      if (!isEnter || isDraw || (socket && isMyTurn)) {
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
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
      setIsMyTurn(true);
      setStatus('your turn!');
    },
    [history, isDraw, isEnter, isMyTurn, socket, stepNumber, volume, xIsNext],
  );

  useEffect(() => {
    if (socket) {
      socket.on('init', (msg: string) => {
        const json = JSON.parse(msg);
        console.log(json);
        console.log('got socket!');
        setIsMyTurn(json.isYourTurn);
        setUserId(json.userId);
        setRoomId(json.roomId);
        if (json.opponentPlayer) {
          setIsEnter(true);
          if (isMyTurn) setStatus('game start! its your turn!');
          else setStatus('game start! wait opponent turn...');
        } else {
          setStatus('waiting opponent player...');
        }
      });

      socket.on('set', (msg: string) => {
        const json = JSON.parse(msg);
        console.log(json);
        if (json.userId === userId) {
          console.log('got return my emit!');
          return;
        }
        handleMessage(json.col);
      });

      socket.on('start', () => {
        setIsEnter(true);
        if (isMyTurn) setStatus('game start! its your turn!');
        else setStatus('game start! wait opponent turn...');
      });
    }
  }, [isMyTurn, socket, userId, isEnter, handleMessage, stepNumber]);

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    audioPlay('audio/switch.mp3', volume);
    setIsDraw(false);
    jumpTo(0);
  };

  const connectSocket = (id: string) => {
    const socket = enterRoom(id);
    console.log(socket);
    if (socket) {
      console.log('got socket!');
      setSocket(socket);
      setStatus(`waiting room init...`);
    }
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
      <input type="text" name="roomId" placeholder="Enter" />
      <button disabled={socket ? true : false} onClick={() => connectSocket('345')}>
        connectWebsocket
      </button>
      <p>{status}</p>
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
