import React from 'react';

const Title = React.memo(function showTitle() {
  return (
    <div className="game-title">
      <span className="neon flash">
        電<span>電</span>
      </span>
      <span className="neon flash">
        脳<span>脳</span>
      </span>
      <span className="neon flash">
        盤<span>盤</span>
      </span>
      <span className="neon flash">
        上<span>上</span>
      </span>
      <span className="neon flash">
        娯<span>娯</span>
      </span>
      <span className="neon flash">
        楽<span>楽</span>
      </span>
      <span className="neon flash">
        &nbsp;<span>&nbsp;</span>
      </span>
      <span className="neon flash">
        四<span>四</span>
      </span>
      <span className="neon flash">
        子<span>子</span>
      </span>
      <span className="neon flash">
        棋<span>棋</span>
      </span>
    </div>
  );
});

export default Title;
