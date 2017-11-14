import React, { Component } from 'react';

class ReminderForm extends Component {
  state = {
    reminder: {}
  }

  submit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.reminder);
  }

  handleChange = (e) => {

  }

  render() {
    return (
      <div>
        <h1>Reminder</h1>
        <form onSubmit={this.submit}>
          <label htmlFor="time_of_reminder">Time of Reminder</label>
          <input name="time_of_reminder"
            type="datetime-local"
            min={this.props.today}
            onChange={this.handleChange}
            required />
          <br />
          <label htmlFor="title">Title</label>
          <input type="title" type='text' onChange={this.handleChange} required />
          <br />
          <label htmlFor="task">Task</label>
          <input type="task" type='text' onChange={this.handleChange} required />
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default ReminderForm;