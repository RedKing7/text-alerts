import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AlertForm from './AlertForm';
import styled from 'styled-components';

const ListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  h1{
    margin-left: auto;
    margin-right: auto;
    text-decoration: underline;
  }
`
const Links = styled.div`
  display: flex;
  justify-content: space-around;
`
const AlertsUI = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media(max-width: 600px){
    flex-direction: column;
    justify-content:center;
    align-items: center;
  }
`
const Alerts = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media(min-width: 1000px){
    width: 60%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media(max-width: 600px){
    width: 100%;
    padding: 0 5px;
    flex-direction: row;
    flex-wrap: wrap;
  }
`
const FormDiv = styled.div`
  width: 60%;
  @media(max-width: 600px){
    width: 100%;
  }
  @media(min-width: 1000px){
    width: 25%;
  }
`
const Alert = styled.div`
  padding: 20px 10px;
  padding-top: 0;
  box-shadow: 0 0 3px black;
  margin: 5px;
`

class AlertsList extends Component {
  state = {
    user: {},
    reminders: [],
    alarms: [],
    formActive: true, //!!!!!!!!!!!!! Change back to false!
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

  logout = async (e) => {
    e.preventDefault();
    console.log('hello')
    try {
      await axios.post(`/api/users/${this.state.user.id}/logout`, { user_id: this.state.user.id });
      this.setState({ redirect: true });
    } catch (err) { console.log(err) }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/`} />
    }
    return (
      <ListDiv>
        <Links>
          <a onClick={this.logout} className='nav-link'>Logout</a>
          <Link className='nav-link' to={`/${this.state.user.id}`}>Account</Link>
        </Links>
        <h1>{this.state.user.name}'s Alerts</h1>
        <AlertsUI>
          <Alerts>
            {/* <h2>Reminders</h2> */}
            {
              this.state.reminders.map((reminder, index) => {
                return (
                  <Alert key={index}>
                    <h2>Reminder</h2>
                    <h3>{reminder.title}</h3>
                    <h4>{reminder.task}</h4>
                    <h4>{(new Date(reminder.time_of_reminder)).toLocaleString()}</h4>
                    <button id={reminder.id} onClick={this.deleteReminder}>Delete</button>
                    <br />
                  </Alert>
                )
              })
            }
            {/* <hr /> */}
            {/* <h2>Alarms</h2> */}
            {
              this.state.alarms.map((alarm, index) => {
                return (
                  <Alert key={index}>
                    <h2>Alarm</h2>
                    <h3>{alarm.name}</h3>
                    <h4>{(new Date(alarm.time_of_alarm)).toLocaleString()}</h4>
                    <button id={alarm.id} onClick={this.deleteAlarm}>Delete</button>
                  </Alert>
                )
              })
            }
          </Alerts>
          <FormDiv>
            {
              this.state.formActive ?
                <div>
                  <button onClick={this.toggleForm}>Cancel</button>
                  <AlertForm addReminder={this.addReminder} addAlarm={this.addAlarm} />
                </div>
                :
                <button onClick={this.toggleForm}>New Alert</button>
            }
          </FormDiv>
        </AlertsUI>
      </ListDiv>
    );
  }
}

export default AlertsList;