import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

import './countdown.scss';

let first;
const PrintResult = props => {
  const { startTime, currentTime } = props;
  const diff = startTime - currentTime;
  let percent;
  let min = 0;
  let sec = 0;
  let ms = 0;

  if (!first) {
    first = diff;
  }
  if (startTime === 0) {
    percent = 0;
    first = undefined;
  } else {
    percent = 100 - Math.round((diff / first) * 100);
    const time = new Date(diff);
    min = time.getMinutes();
    sec = time.getSeconds();
    ms = time.getMilliseconds();
  }

  return (
    <div className="result-countdown">
      <div>
        Time to end {min} : {sec}: {ms}
      </div>
      <Progress type="circle" percent={percent} />
    </div>
  );
};

PrintResult.defaultProps = {
  startTime: 0,
  currentTime: 0,
};

PrintResult.propTypes = {
  startTime: PropTypes.number,
  currentTime: PropTypes.number,
};

export default PrintResult;
