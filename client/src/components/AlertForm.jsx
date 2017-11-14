import React, { Component } from 'react';
// import axios from 'axios';
import AlarmForm from './AlarmForm';
import ReminderForm from './ReminderForm';

class AlertForm extends Component {
  state = {
    isReminder: true,
    newReminder: {},
    newAlarm: {},
    today: ''
  }


  componentWillMount() {
    // get today's date, for min value of time entry
    // 2017-11-13T00:00
    // ^want this format^
    let today = new Date();
    let todayString = '';
    let year = today.getFullYear();
    //zero pad month, day, minutes and hours
    //add one to month, which is 0-11
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);

    todayString = `${year}-${month}-${day}T${hours}:${minutes}`;

    console.log(todayString);
    this.setState({ today: todayString });
  }

  handleSubmit = async (alert) => {
    // console.log(this.state.isReminder ? 'reminder: ' : 'alarm: ', alert);
    let time = new Date;
    let timezone = time.getTimezoneOffset();
    if (this.state.isReminder) {
      alert.time_of_reminder += ` ${timezone}`;
      this.props.addReminder(alert)
    } else {
      alert.time_of_alarm += ` ${timezone}`
      this.props.addAlarm(alert)
    }
  }

  toggleForm = () => {
    this.setState({ isReminder: !this.state.isReminder });
  }

  render() {
    return (
      <div>
        {
          this.state.isReminder ?
            <div>
              <button onClick={this.toggleForm}>Alarm</button>
              <br />
              <ReminderForm today={this.state.today} submit={this.handleSubmit} />
            </div>
            :
            <div>
              <button onClick={this.toggleForm}>Reminder</button>
              <br />
              <AlarmForm today={this.state.today} submit={this.handleSubmit} />
            </div>
        }
      </div>
    );
  }
}

export default AlertForm;