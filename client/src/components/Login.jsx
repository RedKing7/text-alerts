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
        <h1>Sign in</h1>
        <hr />
        {
          this.state.users.map((user, index) => {
            return (
              <div key={index}>
                <Link to={`/${user.id}/`}>{user.name}</Link>
                {/* display name in different color if not verified */}
                {
                  // user.has_been_verified ?
                  //   null
                  //   :
                  //   null
                }
              </div>
            )
          })
        }
        <hr />
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }
}

export default Login;