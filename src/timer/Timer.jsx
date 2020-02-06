import React from 'react';
import { Button } from 'antd';

import './timer.scss';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: { all: 0, min: 0, sec: 0, ms: 0 },
      open: true,
      startTime: 0,
      printTextOnButton: 'Run',
      prev: 0,
    };
  }

  changeTime = value => {
    const { prev, open } = this.state;
    const diff = value - prev;
    if (diff > 150 && !open) {
      const { startTime } = this.state;
      const all = Date.now() - startTime; // получаем разницу между началом и текущим временем
      const date = new Date(all); // создаем объект дата чтобы получить мин сек и мс
      const min = date.getMinutes(); // получаем мин
      const sec = date.getSeconds(); // получаем сек
      const ms = date.getMilliseconds(); // получаем мс
      this.setState({ time: { all, min, sec, ms }, prev: value }); // меняем стейт на новый
    }
    if (!open) {
      requestAnimationFrame(this.changeTime);
    }
  };

  toggleTimer = evt => {
    evt.preventDefault();
    const { open, time } = this.state;
    if (open) {
      requestAnimationFrame(this.changeTime);
      this.setState({
        startTime: Date.now() - time.all,
        open: false,
        printTextOnButton: 'Pause',
      });
    } else {
      this.setState({ open: true, printTextOnButton: 'Run', prev: 0 });
    }
  };

  resetTimer = evt => {
    evt.preventDefault();
    this.setState({
      time: { min: 0, sec: 0, ms: 0, all: 0 },
      open: true,
      printTextOnButton: 'Run',
      prev: 0,
    });
  };

  render() {
    const { time, printTextOnButton } = this.state;
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
            {printTextOnButton}
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
