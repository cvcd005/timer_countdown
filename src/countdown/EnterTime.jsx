import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';

class EnterTime extends React.Component {
  giveTime = (min, sec) => {
    const { getTime } = this.props;
    getTime(min, sec);
  };

  sliderChange = value => {
    const min = Math.floor(value / 60); // округляем до минут
    const sec = value - min * 60; // получаем секунды
    this.giveTime(min, sec);
  };

  minChange = min => {
    const { sec } = this.props; // получаем секунды из стейта
    this.giveTime(min, sec);
  };

  secChange = sec => {
    const { min } = this.props; // получаем минуты из стейта
    this.giveTime(min, sec);
  };

  render() {
    const { min, sec } = this.props;
    const { close } = this.props;
    return (
      <div>
        MIN
        <InputNumber value={min} onChange={this.minChange} disabled={close} max={720} min={0} />
        SEC
        <InputNumber value={sec} onChange={this.secChange} disabled={close} max={59} min={0} />
        <Slider
          value={min * 60 + sec}
          onChange={this.sliderChange}
          disabled={close}
          step={15}
          min={0}
          max={3600}
        />
      </div>
    );
  }
}

EnterTime.defaultProps = {
  min: 0,
  sec: 0,
  close: false,
};

EnterTime.propTypes = {
  min: PropTypes.number,
  sec: PropTypes.number,
  close: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  getTime: PropTypes.func,
};

export default EnterTime;
