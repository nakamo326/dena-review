import Stone from './stone';

export function Indicator(props) {
  let status;
  let left = null;
  let right = null;
  if (props.winner) {
    status = props.winner;
  } else {
    status = props.xIsNext ? 'X' : 'O';
  }
  if (!props.isDraw) {
    if (status === 'X') {
      left = status;
    } else {
      right = status;
    }
  }
  return (
    <div className="indicator">
      <Stone value={left} onClick={() => {}}></Stone>
      <Stone value={right} onClick={() => {}}></Stone>
    </div>
  );
}

export default Indicator;
