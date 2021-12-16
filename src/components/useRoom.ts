import { useState } from 'react';

export interface roomAns {
  userId: string;
  roomId: string;
  opponentPlayer: boolean;
  isYourTurn: boolean;
}

export interface roomInfo {
  isMyTurn: boolean;
  userId: string;
  roomId: string;
}

export function useRoom(): [
  roomInfo,
  (json: roomAns) => void,
  React.Dispatch<React.SetStateAction<boolean>>,
] {
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState('');

  const roomInit = (json: roomAns) => {
    console.log(json);
    setIsMyTurn(json.isYourTurn);
    setUserId(json.userId);
    setRoomId(json.roomId);
  };

  const roomInfo: roomInfo = {
    isMyTurn: isMyTurn,
    userId: userId,
    roomId: roomId,
  };
  return [roomInfo, roomInit, setIsMyTurn];
}
