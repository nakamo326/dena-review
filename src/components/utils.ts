//  return placeable index number, or return null if stone is full on col
export function isPlaceable(squares: Array<string>, col: number): number | null {
  for (let row = 5; row >= 0; row--) {
    const index = row * 7 + col;
    if (squares[index] === null) {
      return index;
    }
  }
  return null;
}

export function calculateWinner(squares: Array<string>, index: number): Array<number> | null {
  const row = Math.trunc(index / 7);
  const col = index % 7;
  const dirList = [
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  if (index === 42) return null;
  if (squares[index] !== null) {
    for (let i = 0; i < 8; i++) {
      const line = [
        (row + dirList[i][0] * 0) * 7 + (col + dirList[i][1] * 0),
        (row + dirList[i][0] * 1) * 7 + (col + dirList[i][1] * 1),
        (row + dirList[i][0] * 2) * 7 + (col + dirList[i][1] * 2),
        (row + dirList[i][0] * 3) * 7 + (col + dirList[i][1] * 3),
      ];
      if (!isOverRun(i, line.slice(0, 2))) continue;
      const set = new Set(
        line.map((val) => {
          return squares[val];
        }),
      );
      if (set.size === 1) {
        return line;
      }
    }
  }
  return calculateWinner(squares, index + 1);
}

function isOverRun(dir: number, array: Array<number>) {
  for (let i = 0; i < 3; i++) {
    const element = array[i];
    const row = Math.trunc(element / 7);
    const col = element % 7;

    if (
      (col === 0 && dir >= 3 && dir <= 5) ||
      (row === 0 && dir >= 1 && dir <= 3) ||
      (col === 6 && (dir <= 1 || dir === 7)) ||
      (row === 5 && dir >= 6 && dir <= 8)
    )
      return false;
  }
  return true;
}

export function makeWinSquares(squares: Array<string | null>, winStreak: number[] | null) {
  const winner = winStreak ? squares[winStreak[0]] : null;
  if (winStreak) {
    for (let i = 0; i < squares.length; i++) {
      squares[i] = winStreak.includes(i) ? winner : null;
    }
  }
}

export function audioPlay(path: string, volume: number): void {
  const audio = new Audio(path);
  audio.volume = volume;
  audio
    .play()
    .then(() => {
      console.log('Audio started!');
    })
    .catch((error) => console.warn(error));
}
