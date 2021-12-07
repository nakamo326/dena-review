

//  return placeable index number, or return null if stone is full on col
export function isPlaceable(squares, i) {
  const col = i % 7;
  for (let row = 0; row < 6; row++) {
    const index = row * 7 + col;
    if (squares[index] !== null) {
      if (row === 0)
      return null;
      else
      return index - 7;
    }
  }
  return col + 35;
}

export function calculateWinner(squares, index) {
  if (index === 42) {
    return null;
  }
  if (squares[index] === null)
    return calculateWinner(squares, index + 1);
  const dirList =[
    [0,1], [-1,1], [-1,0], [-1,-1], [0,-1], [1,-1], [1,0], [1,1]
  ];// 右,  右上,     上,     左上,     左,     左下,   下、    右下

  const row = Math.trunc(index / 7);
  const col = index % 7;

  for (let i = 0; i < 8; i++) {
    const [a, b, c, d] = [
      (row + dirList[i][0] * 0) * 7 + (col + dirList[i][1] * 0),
      (row + dirList[i][0] * 1) * 7 + (col + dirList[i][1] * 1),
      (row + dirList[i][0] * 2) * 7 + (col + dirList[i][1] * 2),
      (row + dirList[i][0] * 3) * 7 + (col + dirList[i][1] * 3)
    ];
    if (!checkJump(i, [a, b, c]))
      continue;
    if (squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
      return squares[a];
    }
  }
  return calculateWinner(squares, index + 1);
}

function checkJump(dir, array) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const row = Math.trunc(element / 7);
    const col = element % 7;

    if ((col === 0 && dir >= 3 && dir <= 5)
      || (row === 0 && dir >= 1 && dir <= 3)
      || (col === 6 && (dir <= 1 || dir === 7))
      || (row === 5 && dir >= 6 && dir <= 8))
    return false;
  }
  return true;
}

export function audioPlay (path, volume) {
  const audio = new Audio(path);
  audio.volume = volume;
  audio.play().then(() => {
    console.log("Audio started!")
  })
    .catch(error => console.warn(error))
}
