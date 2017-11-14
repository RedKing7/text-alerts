import React, { Component } from 'react';
import axios from 'axios';

class AlertsList extends Component {
  state = {
    user: {},
    reminders: [],
    alarms: []
  }

  async componentWillMount() {
    try {
      let response = await axios.get(`/api/users/${this.props.match.params.userId}`)
      await this.setState({ user: response.data })
      response = await axios.get(`/api/users/${this.state.user.id}/reminders`)
      await this.setState({ reminders: response.data })
      response = await axios.get(`/api/users/${this.state.user.id}/alarms`)
      await this.setState({ alarms: response.data })
    } catch (err) { console.log(err) }
  }

  render() {
    return (
      <div>
        <h1>{this.state.user.name}</h1>
        <hr />
        <h2>Reminders</h2>
        {
          this.state.reminders.map((reminder, index) => {
            return (
              <div key={index}>
                <h3>{reminder.title}</h3>
                <h4>{reminder.task}</h4>
                <h4>{reminder.time_of_reminder}</h4>
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
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default AlertsList;