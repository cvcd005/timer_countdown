import React from 'react';
import { Button } from 'antd';

import './timer.scss';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: { all: 0, min: 0, sec: 0, ms: 0 },
      isRunning: false,
      startTime: 0,
      prev: 0,
    };
  }

  changeTime = value => {
    const { isRunning, prev } = this.state;
    const diff = value - prev;
    if (diff > 150 && isRunning) {
      const { startTime } = this.state;
      const all = Date.now() - startTime; // получаем разницу между началом и текущим временем
      const date = new Date(all); // создаем объект дата чтобы получить мин сек и мс
      const min = date.getMinutes(); // получаем мин
      const sec = date.getSeconds(); // получаем сек
      const ms = date.getMilliseconds(); // получаем мс
      this.setState({ time: { all, min, sec, ms }, prev: value }); // меняем стейт на новый
    }
    if (isRunning) {
      requestAnimationFrame(this.changeTime);
    }
  };

  toggleTimer = evt => {
    evt.preventDefault();
    const { isRunning, time } = this.state;
    if (!isRunning) {
      requestAnimationFrame(this.changeTime);
      this.setState({
        startTime: Date.now() - time.all,
        isRunning: true,
      });
    } else {
      this.setState({ isRunning: false, prev: 0 });
    }
  };

  resetTimer = evt => {
    evt.preventDefault();
    this.setState({
      time: { min: 0, sec: 0, ms: 0, all: 0 },
      isRunning: false,
      prev: 0,
    });
  };

  render() {
    const { time, isRunning } = this.state;
    return (
      <div className="timer">
        <ul className="timer__list">
          <li className="timer__item">
            <span>min</span>
            <span>{time.min}</span>
          </li>
          <li className="timer__item">
            <span>sec</span>
            <span>{time.sec}</span>
          </li>
          <li className="timer__item">
            <span>ms</span>
            <span>{time.ms}</span>
          </li>
        </ul>
        <div className="btn-group">
          <Button className="btn--timer" onClick={this.toggleTimer}>
            {isRunning ? 'Pause' : 'Run'}
          </Button>
          <Button className="btn--timer" onClick={this.resetTimer}>
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default Timer;
