interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface initJson {
  userId: string;
  roomId: string;
  opponentPlayer: boolean;
  isYourTurn: boolean;
}
