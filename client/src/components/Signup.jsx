import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  state = {
    user: {
      name: 'name',
      password: 'password',
      phone_number: 'xxx-xxx-xxxx'
    },
    userId: '',
    redirect: false
  }

  createUser = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`/api/users`, this.state.user);
      await this.setState({ userId: response.data.id });
      this.toggleRedirect();
    } catch (err) { console.log(err) }
  }

  handleChange = (e) => {
    let attr = e.target.name;
    let value = e.target.value;
    let changedUser = { ...this.state.user }
    changedUser[attr] = value;
    this.setState({ user: changedUser });
  }

  toggleRedirect = () => {
    this.setState({ redirect: !this.state.redirect });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/${this.state.userId}/alerts`} />
    }
    return (
      <div>
        <form onSubmit={this.createUser}>
          <label htmlFor="name">Name: </label>
          <input
            name='name'
            type="text"
            onChange={this.handleChange}
            value={this.state.user.name}
            required />
          <br />

          <label htmlFor="password">Password: </label>
          <input
            name='password'
            type="password"
            onChange={this.handleChange}
            value={this.state.user.password}
            required />
          <br /><br />

          <label htmlFor="phone_number">Phone Number, with the format 123-456-7890</label>
          <br />
          <input
            name='phone_number'
            type="tel"
            maxLength='12'
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={this.handleChange}
            value={this.state.user.phone_number}
            required />
          <br /><br />
          <input type="submit" />
        </form>
        <Link to='/'>Cancel</Link>
      </div>
    );
  }
}
export default Signup;