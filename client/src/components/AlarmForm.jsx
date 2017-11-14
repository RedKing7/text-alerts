import React, { Component } from 'react';

class AlarmForm extends Component {
  state = {
    alarm: {}
  }

  componentWillMount() {
    this.setState({
      alarm: {
        repeat: false,
        time_of_alarm: this.props.today,
        name: 'New Alarm'
      }
    })
  }

  submit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.alarm);
  }

  handleChange = (e) => {
    let attribute = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    let changedAlarm = { ...this.state.alarm }
    changedAlarm[attribute] = value;
    this.setState({ alarm: changedAlarm });
    console.log(changedAlarm)
  }

  render() {
    return (
      <div>
        <h1>Alarm</h1>
        <form onSubmit={this.submit}>
          <label htmlFor="time_of_alarm">Time of Alarm</label>
          <input name="time_of_alarm"
            type="datetime-local"
            min={this.props.today}
            onChange={this.handleChange}
            required />
          <br />
          <label htmlFor="name">Name</label>
          <input name="name"
            type='text'
            value={this.state.alarm.name}
            onChange={this.handleChange}
            required />
          <br />
          <label htmlFor="repeat">Repeat</label>
          <input name="repeat"
            type='checkbox'
            defaultChecked={
              this.state.alarm.repeat ?
                true
                :
                false
            }
            onChange={this.handleChange} />
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AlarmForm;