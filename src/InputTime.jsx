import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12
};

class InputTime extends Component {
  render() {
    const { start, end, handleChange, handleSubmit } = this.props

    return (
      <div>
        <input name='start' type='time' style={style} value={start} onChange={handleChange}/>
        <input name='end' type='time' style={style} value={end} onChange={handleChange}/>

        <RaisedButton label='Submit' primary={true} style={style}
                      onClick={handleSubmit}/>
      </div>
    );
  }
}

export default InputTime;
