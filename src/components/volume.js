import React from 'react';
import '../index.css';


class Volume extends React.Component {
  render() {
    const volume = this.props.volume;
    if (volume === 1) {
      return (
        <div className="volume">
          <i className="fas fa-volume-up fa-3x"
            onClick={() => this.props.onClick()}
          ></i>
        </div>);
    } else if (volume === 0.5) {
      return (
        <div className="volume">
          <i className="fas fa-volume-down fa-3x"
            onClick={() => this.props.onClick()}
          ></i>
        </div>);
    } else {
      return (
        <div className="volume">
          <i className="fas fa-volume-off fa-3x"
            onClick={() => this.props.onClick()}
          ></i>
        </div>);
    }
  }
}

export default Volume;