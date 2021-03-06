import React, { Component } from 'react';
import AlarmForm from './AlarmForm';
import ReminderForm from './ReminderForm';
import styled from 'styled-components';

const AlertFormDiv = styled.div`
  box-shadow: 0 0 5px black;
  width: 80%;
  margin: 20px auto;
  padding: 10px 0;
  h2{
    font-size: 2em;
    margin-bottom: 0;
  }
  input{
    text-align: center;
    width: 75%;
    font-size: 1.3em;
  }
  label{
    font-size: 1.5em;
  }
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input[type='checkbox']{
    width: 10%;
  }
`

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

    this.setState({ today: todayString });
  }

  handleSubmit = async (alert) => {
    let time = new Date();
    let timezone = time.getTimezoneOffset();
    if (this.state.isReminder) {
      // before: 2017-11-15T09:43
      let remind_date = new Date(alert.time_of_reminder);
      let utc = new Date(remind_date + (timezone * (60 * 1000)));
      alert.time_of_reminder = utc;
      // after: Wed Nov 15 2017 09:43:00 GMT-0500 (EST)
      this.props.addReminder(alert)
    } else {
      let alarm_date = new Date(alert.time_of_alarm);
      //turns date into UTC format, so the timezone is set correctly in rails
      let utc = new Date(alarm_date + (timezone * (60 * 1000)));
      alert.time_of_alarm = utc;
      this.props.addAlarm(alert)
    }
  }

  toggleForm = () => {
    this.setState({ isReminder: !this.state.isReminder });
  }

  render() {
    return (
      <AlertFormDiv>
        {
          this.state.isReminder ?
            <div>
              <button onClick={this.toggleForm}>Alarm</button>
              <h2>New Reminder</h2>
              <ReminderForm today={this.state.today} submit={this.handleSubmit} />
            </div>
            :
            <div>
              <button onClick={this.toggleForm}>Reminder</button>
              <h2>New Alarm</h2>
              <AlarmForm today={this.state.today} submit={this.handleSubmit} />
            </div>
        }
      </AlertFormDiv>
    );
  }
}

export default AlertForm;