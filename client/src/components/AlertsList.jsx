import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AlertForm from './AlertForm';

class AlertsList extends Component {
  state = {
    user: {},
    reminders: [],
    alarms: [],
    formActive: false,
    redirect: false
  }

  async componentWillMount() {
    try {
      let response = await axios.get(`/api/users/${this.props.match.params.userId}`)
      await this.setState({ user: response.data })
      if (!this.state.user.verified) {
        await this.setState({ redirect: true });
      }
      await this.getReminders();
      await this.getAlarms();
    } catch (err) { console.log(err) }
  }

  getReminders = async () => {
    try {
      let response = await axios.get(`/api/users/${this.state.user.id}/reminders`)
      await this.setState({ reminders: response.data })
    } catch (err) { console.log(err) }
  }

  getAlarms = async () => {
    try {
      let response = await axios.get(`/api/users/${this.state.user.id}/alarms`)
      await this.setState({ alarms: response.data })
    } catch (err) { console.log(err) }
  }

  toggleForm = () => {
    this.setState({ formActive: !this.state.formActive });
  }

  addReminder = async (reminder) => {
    try {
      await axios.post(`/api/users/${this.state.user.id}/reminders`, reminder);
      this.toggleForm();
      this.getReminders();
    } catch (err) { console.log(err) }
  }

  addAlarm = async (alarm) => {
    try {
      await axios.post(`/api/users/${this.state.user.id}/alarms`, alarm);
      this.toggleForm();
      this.getAlarms();
    } catch (err) { console.log(err) }
  }

  deleteAlarm = async (e) => {
    try {
      let alarmId = e.target.id;
      await axios.delete(`/api/users/${this.state.user.id}/alarms/${alarmId}`)
      this.getAlarms();
    } catch (err) { console.log(err) }
  }

  deleteReminder = async (e) => {
    try {
      let reminderId = e.target.id;
      await axios.delete(`/api/users/${this.state.user.id}/reminders/${reminderId}`)
      this.getReminders();
    } catch (err) { console.log(err) }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/`} />
    }
    return (
      <div>
        <Link to="/">Logout</Link>
        <h1>{this.state.user.name}'s Alerts</h1>
        <Link to={`/${this.state.user.id}`}>Account</Link>
        <hr />
        <h2>Reminders</h2>
        {
          this.state.reminders.map((reminder, index) => {
            return (
              <div key={index}>
                <h3>Title: {reminder.title}</h3>
                <h4>Task: {reminder.task}</h4>
                <h4>{reminder.time_of_reminder}</h4>
                <button id={reminder.id} onClick={this.deleteReminder}>Delete</button>
                <br />
              </div>
            )
          })
        }
        <hr />
        <h2>Alarms</h2>
        {
          this.state.alarms.map((alarm, index) => {
            return (
              <div key={index}>
                <h3>{alarm.name}</h3>
                <h4>{alarm.time_of_alarm}</h4>
                <button id={alarm.id} onClick={this.deleteAlarm}>Delete</button>
              </div>
            )
          })
        }
        <hr />
        {
          this.state.formActive ?
            <div>
              <AlertForm addReminder={this.addReminder} addAlarm={this.addAlarm} />
              <button onClick={this.toggleForm}>Cancel</button>
            </div>
            :
            <button onClick={this.toggleForm}>New Alert</button>
        }
      </div>
    );
  }
}

export default AlertsList;