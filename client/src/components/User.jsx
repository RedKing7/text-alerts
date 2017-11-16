import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


class User extends Component {
  state = {
    user: {},
    showConfirmation: false,
    redirect: false,
    code: '',
    verifyForm: false
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

  startVerification = async () => {
    try {
      let response = await axios.post('/phone_verifications/', { user_id: this.state.user.id })
      // if(response.data !== 'success')
      console.log(response);
      this.toggleVerifyForm();
    } catch (err) { console.log(err) }
  }

  verify = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post('/phone_verifications/verify', { code: this.state.code, user_id: this.state.user.id })
      // if(response.data !== 'success')
      console.log(response);
      this.toggleVerifyForm();
      this.getUser();
    } catch (err) { console.log(err) }
  }

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  }

  toggleVerifyForm = () => {
    this.setState({ verifyForm: !this.state.verifyForm });
  }

  toggleRedirect = () => {
    this.setState({ redirect: !this.state.redirect });
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
        {
          this.state.user.verified ?
            <div>
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
            </div>
            :
            <div>
              {
                this.state.user.has_been_verified ?
                  <h3>You need to verify that it's really you before you can continue</h3>
                  :
                  <div>
                    <h3>This number is not verified. You must verify before you can continue.</h3>
                    <hr />
                    {
                      this.state.showConfirmation ?
                        <div>
                          <h3>Are you sure?</h3>
                          <button onClick={this.toggleConfirmation}>Cancel</button>
                          <button onClick={this.deleteUser}>Delete</button>
                        </div>
                        :
                        <button onClick={this.toggleConfirmation}>Cancel, Delete User</button>
                    }
                  </div>
              }
              {
                this.state.verifyForm ?
                  <form onSubmit={this.verify}>
                    <label htmlFor="code">Enter the code you were sent: </label>
                    <input name='code' type="text" value={this.state.code} onChange={this.handleChange} minLength='4' maxLength='4' />
                    <input type="submit" value='Verify' />
                    <br />
                    <label>Didn't get it? Either there was an error, or you didn't enter the number correctly. Either way, you should delete this account and try again</label>
                  </form>
                  :
                  <button onClick={this.startVerification}>Verify Number</button>
              }
            </div>
        }
        {
          this.state.user.verified ?
            <Link to={`/${this.state.user.id}/alerts`}>Alerts</Link>
            :
            <Link to='/'>Back</Link>
        }
      </div>
    );
  }
}

export default User;