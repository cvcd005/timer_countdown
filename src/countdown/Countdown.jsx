import React from 'react';
import { Button } from 'antd';

import EnterTime from './EnterTime';
import PrintResult from './PrintResult';

import sound from '../audio/sound.mp3';

import './countdown.scss';

const initialState = {
  isRunning: false,
  isDisable: false,
  min: 0,
  sec: 0,
  startTime: 0,
};

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  setTime = (min, sec) => {
    const time = min * 60 + sec;
    this.setState({ time: time * 1000, min, sec });
  };

  changeTime = () => {
    const { startTime } = this.state;
    if (startTime > Date.now()) {
      const newtimerId = setTimeout(() => this.changeTime(), 1000);
      this.setState({ timerId: newtimerId });
    } else {
      const audio = new Audio(sound);
      audio.play();
      this.setState({ ...initialState, time: 0 });
    }
  };

  toggleCountdown = evt => {
    evt.preventDefault();
    const { isRunning } = this.state;
    if (!isRunning) {
      const { time = 0 } = this.state;
      const currentTime = Date.now();
      const startTime = currentTime + time;

      if (startTime === currentTime) {
        return;
      }
      this.setState(
        {
          isRunning: true,
          isDisable: true,
          startTime,
        },
        () => this.changeTime()
      );
    } else {
      const { timerId, startTime } = this.state;
      clearTimeout(timerId);
      this.setState({ isRunning: false, time: startTime - Date.now(), timerId: null });
    }
  };

  resetCountdown = evt => {
    evt.preventDefault();
    const { timerId } = this.state;
    clearTimeout(timerId);
    this.setState({ ...initialState, time: 0, timerId: null });
  };

  render() {
    const { startTime, isRunning, min, sec, isDisable } = this.state;
    return (
      <div className="countdown">
        <EnterTime setTime={this.setTime} isDisable={isDisable} min={min} sec={sec} />
        <div className="btn-countdown">
          <Button onClick={this.toggleCountdown}>{isRunning ? 'Pause' : 'Run'}</Button>
          <Button onClick={this.resetCountdown}>Reset</Button>
        </div>
        <br />
        <PrintResult
          startTime={isDisable ? min * 60 + sec : 0}
          currentTime={isDisable ? startTime - Date.now() : 0}
        />
      </div>
    );
  }
}

export default Countdown;
