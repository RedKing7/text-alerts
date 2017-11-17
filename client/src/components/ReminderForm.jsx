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
    let attribute = e.target.name;
    const value = e.target.value;
    let changedReminder = { ...this.state.reminder }
    changedReminder[attribute] = value;
    this.setState({ reminder: changedReminder });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          {/* <label htmlFor="time_of_reminder">Time of Reminder</label> */}
          <input name="time_of_reminder"
            type="datetime-local"
            min={this.props.today}
            onChange={this.handleChange}
            required />
          {/* <label htmlFor="title">Title</label> */}
          <input name="title"
            type='text'
            onChange={this.handleChange}
            placeholder='Title'
            required />
          {/* <label htmlFor="task">Task</label> */}
          <input name="task"
            type='text'
            onChange={this.handleChange}
            placeholder='Task'
            required />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default ReminderForm;