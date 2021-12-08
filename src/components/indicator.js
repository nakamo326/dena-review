import React from 'react';
import '../index.css';
import Stone from './stone';


// display next player or draw
class Indicator extends React.Component {
  render() {
    let status;
    if (this.props.isDraw){
      status = 'Draw'
    } else if (this.props.winner) {
      status = this.props.winner;
    } else {
      status = this.props.xIsNext ? 'X' : 'O';
    }
    if (this.props.isDraw){
      return(
      <div className="indicator draw">
        DRAW
      </div>
      );
    } else if (status === 'X') {
      return (
        <div className="indicator">
          <Stone
            value={'X'}
            onClick={() => {}}
          ></Stone>
          <Stone
            value={null}
            onClick={() => {}}
          ></Stone>
        </div>
      )
    } else if (status === 'O') {
      return (
        <div className="indicator">
          <Stone
            value={null}
            onClick={() => {}}
          ></Stone>
          <Stone
            value={'O'}
            onClick={() => {}}
          ></Stone>
        </div>
      )
    }
  }
}

export default Indicator;