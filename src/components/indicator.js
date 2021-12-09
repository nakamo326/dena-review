import React from "react";
import "../index.css";
import Stone from "./stone";

// display next player or draw
class Indicator extends React.Component {
  render() {
    let status;
    let left = null;
    let right = null;
    if (this.props.winner) {
      status = this.props.winner;
    } else {
      status = this.props.xIsNext ? "X" : "O";
    }
    if (!this.props.isDraw) {
      if (status === "X") {
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
}

export default Indicator;
