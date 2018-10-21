import React from 'react';

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

export default InputTime;
