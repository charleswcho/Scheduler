import React, { Component } from 'react';

import ScheduleTable from './ScheduleTable'
import InputTime from './InputTime'

import { isConflicting, sortSchedule, formatSchedule } from './utils'

import './App.css';

class App extends Component {
  state = {
    start: '10:15',
    end: '12:00',
    schedule: [['12:00', '13:00']]
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    const { start, end, schedule } = this.state
    // On submit clear the inputs and create a copy of the schedule
    const shift = [start, end],
          newState = { start: '', end: '', schedule: [...schedule] }

    if (!start || !end || isConflicting(shift, schedule)) {
      alert('Invalid shift inputed')
    } else {
      newState.schedule.push(shift)
      // After adding new shift we sort the schedule
      sortSchedule(newState.schedule)
    }

    this.setState(newState)
  }

  render() {
    const { start, end, schedule } = this.state
    // Change scheule from 24 hour format to 12 hour AM/PM
    const formatted = formatSchedule(schedule)

    return (
      <div className="App">
        <h1>Scheduler</h1>

        { ScheduleTable(formatted) }

        <InputTime start={start} end={end}
                   handleChange={this.handleChange}
                   handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
