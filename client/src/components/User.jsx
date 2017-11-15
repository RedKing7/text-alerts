import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


class User extends Component {
  state = {
    user: {},
    showConfirmation: false,
    redirect: false
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

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div>
        <h1>{this.state.user.name}</h1>
        <button>Change Number</button>
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