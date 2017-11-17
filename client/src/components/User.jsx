import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import VerifyForm from './VerifyForm';

const UserDiv = styled.div`
  h1{
    font-size: 3em;
    margin-bottom: 0;
  }

  input{
    font-size: 1.5em;
  }
  a{
    text-decoration: none;
    color: inherit;
    :hover{
      color: blue;
    }
  }
  .nav-link{
    font-size: 1.4em;
    font-weight: 800;
  }
`

class User extends Component {
  state = {
    user: {},
    showConfirmation: false,
    redirect: false
  }

  async componentWillMount() {
    await this.getUser();
  }

  getUser = async () => {
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
      <UserDiv>
        {
          // this.state.user.verified ?
          //   <a onClick={}>Log Out</a>
          //   :
          //   null
        }
        <h1>{this.state.user.name}</h1>
        {
          this.state.user.verified ?
            <h3>You are currently verified.</h3>
            :
            <div>
              {
                this.state.user.has_been_verified ?
                  <h3>You need to verify that it's really you before you can continue</h3>
                  :
                  <h3>This number is not verified. You must verify before you can continue.</h3>
              }
              <VerifyForm userId={this.state.user.id} getUser={this.getUser} />
            </div>
        }
        <br />
        {
          this.state.user.verified ?
            <Link className="nav-link" to={`/${this.state.user.id}/alerts`}>Alerts</Link>
            :
            null
        }
        <br /><br />
        {
          // only allow deletion if user has been verified and is currently verified
          // or if user has never been verified
          this.state.user.verified || !this.state.user.has_been_verified ?
            this.state.showConfirmation ?
              <div>
                <h3>Are you sure?</h3>
                <button className='cancel' onClick={this.toggleConfirmation}>Cancel</button>
                <button className='delete' onClick={this.deleteUser}>Delete</button>
              </div>
              :
              <button onClick={this.toggleConfirmation}>Delete User</button>
            :
            null
        }
        <br />
        <Link className="nav-link" to='/'>Back</Link>
      </UserDiv>
    );
  }
}

export default User;