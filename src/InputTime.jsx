import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const style = {
  margin: 12
};

const InputTime = ({ start, end, handleChange, handleSubmit }) => (
  <div>
    <input
      name="start"
      type="time"
      style={style}
      value={start}
      onChange={handleChange}
    />

    <input
      name="end"
      type="time"
      style={style}
      value={end}
      onChange={handleChange}
    />

    <Button variant="contained" color="primary" onClick={handleSubmit}>
      Submit
    </Button>
  </div>
);

InputTime.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default InputTime;
