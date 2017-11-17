import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const LoginDiv = styled.div`
  h1{
    font-size: 3em;
    margin-bottom: 0;
  }
  h2{
    width: 75%;
    text-align: left;
  }
  input{
    font-size: 1.5em;
  }
  .nav{
    margin-top: 30px;
  }
  a{
    font-size: 1.2em;
    text-decoration: none;
    color: inherit;
    :hover{
      color: blue;
    }
  }
`
const UserLink = styled.div`
  .un-verified{
    color: rgb(230, 83, 83);
  }
  font-size: 2em;
  margin-bottom: 10px;
`

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
      <LoginDiv>
        <h1>Sign in</h1>
        <h2>Select your account, then verify your phone to continue</h2>
        {
          this.state.users.map((user, index) => {
            return (
              <UserLink key={index}>
                {/* display name in different color if not verified */}
                {
                  user.has_been_verified ?
                    <Link to={`/${user.id}/`} className='verified'>{user.name}</Link>
                    :
                    <Link to={`/${user.id}/`} className='un-verified'>{user.name}</Link>
                }
              </UserLink>
            )
          })
        }
        <Link className='nav' to="/signup">Sign Up</Link>
      </LoginDiv>
    );
  }
}

export default Login;