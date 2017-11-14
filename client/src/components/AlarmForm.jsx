import React, { Component } from 'react';

class AlarmForm extends Component {
  state = {
    alarm: {},
  }

  submit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.alarm);
  }

  handleChange = (e) => {

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
          <input name="name" type='text' onChange={this.handleChange} required />
          <br />
          <label htmlFor="repeat">Repeat</label>
          <input name="repeat" type='checkbox' onChange={this.handleChange} required />
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AlarmForm;