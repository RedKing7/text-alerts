import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


class User extends Component {
  state = {
    user: {},
    showConfirmation: false,
    redirect: false,
    code: ''
  }

  async componentWillMount() {
    try {
      let userId = this.props.match.params.userId;
      let response = await axios.get(`/api/users/${userId}`);
      await this.setState({ user: response.data });
    } catch (err) { console.log(err) }
  }

  deleteUser = async () => {
    try {
      let userId = this.props.match.params.userId;
      await axios.delete(`/api/users/${userId}`);
      this.toggleRedirect();
    } catch (err) { console.log(err) }
  }

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  }

  toggleRedirect = () => {
    this.setState({ redirect: !this.state.redirect });
  }

  startVerification = async () => {
    try {
      let response = await axios.post('/phone_verifications/', { phone_number: this.state.user.phone_number })
      console.log(response);
    } catch (err) { console.log(err) }
  }

  verify = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post('/phone_verifications/verify', { code: this.state.code, phone_number: this.state.user.phone_number })
      console.log(response);
    } catch (err) { console.log(err) }
  }

  handleChange = (e) => {
    let value = e.target.value;
    let changedCode = { ...this.state.code };
    changedCode = value;
    this.setState({ code: changedCode });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div>
        <h1>{this.state.user.name}</h1>
        <button onClick={this.startVerification}>Verify Number</button>
        <form onSubmit={this.verify}>
          <label htmlFor="code">Enter the code you were sent: </label>
          <input name='code' type="text" value={this.state.code} onChange={this.handleChange} />
          <input type="submit" value='Verify' />
        </form>
        <hr />
        {
          this.state.showConfirmation ?
            <div>
              <h3>Are you sure?</h3>
              <button onClick={this.toggleConfirmation}>Cancel</button>
              <button onClick={this.deleteUser}>Delete</button>
            </div>
            :
            <button onClick={this.toggleConfirmation}>Delete User</button>
        }
        <Link to={`/`}>Back</Link>
      </div>
    );
  }
}

export default User;