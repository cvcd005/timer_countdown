import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';

class EnterTime extends React.Component {
  giveTime = (min, sec) => {
    const { setTime } = this.props;
    setTime(min, sec);
  };

  sliderChange = value => {
    const min = Math.floor(value / 60); // округляем до минут
    const sec = value - min * 60; // получаем секунды
    this.giveTime(min, sec);
  };

  minChange = min => {
    const { sec } = this.props; // получаем секунды из пропсов
    min > 720 ? this.giveTime(719, 59) : this.giveTime(min, sec); // если ввели больше 720 мин
  };

  secChange = sec => {
    const { min } = this.props; // получаем минуты из пропсов
    this.giveTime(min, sec);
  };

  render() {
    const { min, sec, isDisable } = this.props;
    return (
      <div>
        MIN
        <InputNumber value={min} onChange={this.minChange} disabled={isDisable} max={719} min={0} />
        SEC
        <InputNumber value={sec} onChange={this.secChange} disabled={isDisable} max={59} min={0} />
        <Slider
          value={min * 60 + sec}
          onChange={this.sliderChange}
          disabled={isDisable}
          step={15}
          min={0}
          max={3600}
        />
      </div>
    );
  }
}

EnterTime.propTypes = {
  min: PropTypes.number,
  sec: PropTypes.number,
  isDisable: PropTypes.bool,
  setTime: PropTypes.func,
};

export default EnterTime;
