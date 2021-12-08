import React from 'react';
import '../index.css';

class Stone extends React.Component {
  render() {
    let color;
    if (this.props.value === null)
      color = "";
    else
      color = this.props.value === 'X' ? 'stone-color1' : 'stone-color2';
    return (
      <button className={'stone ' + color} onClick={() => {
        this.props.onClick();
        }}>
      </button>
    )
  }
}

export default Stone;