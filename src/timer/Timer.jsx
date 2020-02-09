import React from 'react';
import { Button } from 'antd';

import './timer.scss';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false,
      pauseTime: 0,
      timeFromLastAnimate: 0,
    };
  }

  changeTime = value => {
    const { isRunning, timeFromLastAnimate } = this.state;
    const diff = value - timeFromLastAnimate;
    // если прошло больше 150 мс
    if (diff > 150 && isRunning) {
      const { pauseTime } = this.state;
      const time = Date.now() - pauseTime; // получаем текущее время у учетом времени паузы
      this.setState({ time, timeFromLastAnimate: value }); // меняем стейт на новый
    }
    if (isRunning) {
      requestAnimationFrame(this.changeTime);
    }
  };

  toggleTimer = evt => {
    evt.preventDefault();
    const { isRunning, time } = this.state;
    if (!isRunning) {
      this.setState(
        {
          pauseTime: Date.now() - time,
          isRunning: true,
        },
        () => requestAnimationFrame(this.changeTime)
      );
    } else {
      this.setState({ isRunning: false, timeFromLastAnimate: 0 });
    }
  };

  resetTimer = evt => {
    evt.preventDefault();
    this.setState({
      time: 0,
      isRunning: false,
      timeFromLastAnimate: 0,
    });
  };

  conversionTime = data => (data < 10 ? `0${data}` : data);

  render() {
    const { time, isRunning } = this.state;
    const date = new Date(time); // создаем объект дата чтобы получить мин сек и мс
    const min = this.conversionTime(date.getMinutes()); // получаем мин
    const sec = this.conversionTime(date.getSeconds()); // получаем сек
    const ms = date.getMilliseconds() || '00'; // получаем мс

    return (
      <div className="timer">
        <ul className="timer__list">
          <li className="timer__item">
            <span>min</span>
            <span>{min}</span>
          </li>
          <li className="timer__item">
            <span>sec</span>
            <span>{sec}</span>
          </li>
          <li className="timer__item">
            <span>ms</span>
            <span>{ms}</span>
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
