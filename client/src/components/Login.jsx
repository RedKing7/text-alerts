import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  state = {
    users: []
  }

  async componentWillMount() {
    try {
      let response = await axios.get('/api/users')
      this.setState({ users: response.data })
    } catch (err) { console.log(err) }
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <hr />
        {
          this.state.users.map((user, index) => {
            return (
              <div key={index}>
                <Link to={`/${user.id}/alerts`}>{user.name}</Link>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Login;