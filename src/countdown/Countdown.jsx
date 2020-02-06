import React from 'react';
import { Button } from 'antd';

import EnterTime from './EnterTime';
import PrintResult from './PrintResult';

import sound from '../audio/sound.mp3';

import './countdown.scss';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      startTime: 0,
      currentTime: 0,
      close: false,
      work: false,
      printTextOnButton: 'Run',
      min: 0,
      sec: 0,
    };
  }

  getTime = (min, sec) => {
    const { close } = this.state;
    if (!close) {
      const time = min * 60 + sec;
      this.setState({ time: time * 1000, min, sec });
    }
  };

  changeTime = () => {
    const { startTime, currentTime, work } = this.state;
    if (startTime > currentTime && work) {
      this.setState({ currentTime: Date.now() });
      setTimeout(() => this.changeTime(), 1000);
    } else if (startTime <= currentTime) {
      const audio = new Audio(sound);
      audio.play();
      this.setState({
        currentTime: 0,
        startTime: 0,
        close: false,
        work: false,
        time: 0,
        printTextOnButton: 'Run',
        min: 0,
        sec: 0,
      });
    }
  };

  startCountDown = () => {
    const { time } = this.state;
    const currentTime = Date.now();
    const startTime = currentTime + time;

    this.setState(
      {
        close: true,
        work: true,
        startTime,
        currentTime,
        printTextOnButton: 'Pause',
      },
      () => this.changeTime()
    );
  };

  toggleCountDown = evt => {
    evt.preventDefault();
    const { work, startTime, currentTime } = this.state;
    if (!work) {
      this.startCountDown();
    } else {
      this.setState({ work: false, time: startTime - currentTime, printTextOnButton: 'Run' });
    }
  };

  resetCountDown = evt => {
    evt.preventDefault();
    this.setState({
      close: false,
      work: false,
      startTime: 0,
      currentTime: 0,
      time: 0,
      min: 0,
      sec: 0,
      printTextOnButton: 'Run',
    });
  };

  render() {
    const { close, min, sec, printTextOnButton, startTime, currentTime } = this.state;
    return (
      <div className="countdown">
        <EnterTime getTime={this.getTime} close={close} min={min} sec={sec} />
        <div className="btn-countdown">
          <Button onClick={this.toggleCountDown}>{printTextOnButton}</Button>
          <Button onClick={this.resetCountDown}>Reset</Button>
        </div>
        <br />
        <PrintResult startTime={startTime} currentTime={currentTime} />
      </div>
    );
  }
}

export default Countdown;
