//  return placeable index number, or return null if stone is full on col
export function isPlaceable(squares, col) {
  for (let row = 5; row >= 0; row--) {
    const index = row * 7 + col;
    if (squares[index] === null) return index;
  }
  return null;
}

export function calculateWinner(squares, index) {
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

  if (index === 42) {
    return null;
  }
  if (squares[index] !== null) {
    for (let i = 0; i < 8; i++) {
      const [a, b, c, d] = [
        (row + dirList[i][0] * 0) * 7 + (col + dirList[i][1] * 0),
        (row + dirList[i][0] * 1) * 7 + (col + dirList[i][1] * 1),
        (row + dirList[i][0] * 2) * 7 + (col + dirList[i][1] * 2),
        (row + dirList[i][0] * 3) * 7 + (col + dirList[i][1] * 3),
      ];
      if (!isOverRun(i, [a, b, c])) continue;
      if (squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return [a, b, c, d];
      }
    }
  }
  return calculateWinner(squares, index + 1);
}

function isOverRun(dir, array) {
  for (let i = 0; i < array.length; i++) {
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

export function audioPlay(path, volume) {
  const audio = new Audio(path);
  audio.volume = volume;
  audio
    .play()
    .then(() => {
      console.log('Audio started!');
    })
    .catch((error) => console.warn(error));
}
