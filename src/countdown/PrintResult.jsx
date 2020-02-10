import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

import './countdown.scss';

const normalizeTime = data => (data < 10 ? `0${data}` : data);

const PrintResult = props => {
  const { startTime, currentTime } = props;
  let percent;
  let min = 0;
  let sec = 0;
  let ms = '000';

  if (startTime === 0) {
    percent = 0;
  } else {
    percent = 100 - Math.round((currentTime / (startTime * 1000)) * 100);
    const time = new Date(currentTime);
    min = time.getMinutes();
    sec = time.getSeconds();
    ms = time.getMilliseconds();
  }

  return (
    <div className="result-countdown">
      <div>
        Time to end {normalizeTime(min)} : {normalizeTime(sec)}: {ms}
      </div>
      <Progress type="circle" percent={percent} />
    </div>
  );
};

PrintResult.propTypes = {
  startTime: PropTypes.number,
  currentTime: PropTypes.number,
};

export default PrintResult;
