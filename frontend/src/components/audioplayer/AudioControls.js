import React from "react";
import { ReactComponent as Play } from "../../asset/play.svg";
import { ReactComponent as Pause } from "../../asset/pause.svg";
import { ReactComponent as Next } from "../../asset/next.svg";
import { ReactComponent as Prev } from "../../asset/prev.svg";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick
}) => (
  <div className="audio-controls">
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      {/* <Prev /> */}
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <Pause />
      </button>
    ) : (
      <button
        type="button"
        className="play"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <Play />
      </button>
    )}
    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
      {/* <Next /> */}
    </button>
  </div>
);

export default AudioControls;
