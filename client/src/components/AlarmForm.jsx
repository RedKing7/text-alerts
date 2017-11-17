import React, { Component } from 'react';

class AlarmForm extends Component {
  state = {
    alarm: {}
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
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input name="time_of_alarm"
            type="datetime-local"
            min={this.props.today}
            onChange={this.handleChange}
            required />
          <input name="name"
            type='text'
            value={this.state.alarm.name}
            onChange={this.handleChange}
            placeholder='Name'
            required />
          <div className='check-and-label'>
            <label htmlFor="repeat">Repeat: </label>
            <input name="repeat"
              type='checkbox'
              defaultChecked={
                this.state.alarm.repeat ?
                  true
                  :
                  false
              }
              onChange={this.handleChange} />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AlarmForm;