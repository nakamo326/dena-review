import React from 'react';
import '../index.css';
import { audioPlay } from './utils';

type VolumeProps = {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
};

const Volume = React.memo(function showVolume(props: VolumeProps) {
  let classAttribute = '';
  let newVolume: number;
  if (props.volume === 1) {
    classAttribute = 'fas fa-volume-up fa-3x';
    newVolume = 0.5;
  } else if (props.volume === 0.5) {
    classAttribute = 'fas fa-volume-down fa-3x';
    newVolume = 0;
  } else {
    classAttribute = 'fas fa-volume-off fa-3x';
    newVolume = 1;
  }
  return (
    <div className="volume">
      <i
        className={classAttribute}
        onClick={() => {
          audioPlay('audio/switch.mp3', newVolume);
          props.setVolume(newVolume);
        }}></i>
    </div>
  );
});

export default Volume;
