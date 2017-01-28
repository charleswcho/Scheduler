import React, { Component } from 'react';

import ScheduleTable from './ScheduleTable'
import InputTime from './InputTime'

import { isConflicting } from './utils'

import './App.css';

class App extends Component {
  state = {
    start: '10:15',
    end: '12:00',
    schedule: [['12:00', '13:00']],
    err: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    const { start, end, schedule } = this.state

    let shift = [start, end],
        badRange = isConflicting(shift, schedule)

    if (badRange) {
      alert('Invalid shift inputed')
    } else {
      let newState = {...this.state}

      newState.schedule.push(shift)

      this.setState(newState)
    }
  }

  render() {
    const { start, end } = this.state

    return (
      <div className="App">
        <h1>Scheduler</h1>

        { ScheduleTable(this.state.schedule) }

        <InputTime
          start={start}
          end={end}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
