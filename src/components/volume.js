import React from 'react';
import '../index.css';

const Volume = React.memo((props) => {
  if (props.volume === 1) {
    return (
      <div className="volume">
        <i className="fas fa-volume-up fa-3x" onClick={() => props.onClick()}></i>
      </div>
    );
  } else if (props.volume === 0.5) {
    return (
      <div className="volume">
        <i className="fas fa-volume-down fa-3x" onClick={() => props.onClick()}></i>
      </div>
    );
  } else {
    return (
      <div className="volume">
        <i className="fas fa-volume-off fa-3x" onClick={() => props.onClick()}></i>
      </div>
    );
  }
});

export default Volume;
