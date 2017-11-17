import React, { Component } from 'react';
import axios from 'axios';

class VerifyForm extends Component {
  state = {
    code: '',
    formActive: false
  }

  startVerification = async () => {
    try {
      let response = await axios.post('/phone_verifications/', { user_id: this.props.userId })
      // if(response.data !== 'success')
      console.log(response);
      this.toggleForm();
    } catch (err) { console.log(err) }
  }

  verify = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post('/phone_verifications/verify', { code: this.state.code, user_id: this.props.userId })
      // if(response.data !== 'success')
      console.log(response);
      this.toggleForm();
      this.props.getUser();
    } catch (err) { console.log(err) }
  }

  handleChange = (e) => {
    let value = e.target.value;
    let changedCode = { ...this.state.code };
    changedCode = value;
    this.setState({ code: changedCode });
  }

  toggleForm = () => {
    this.setState({ formActive: !this.state.formActive });
  }

  render() {
    return (
      <div>
        {
          this.state.formActive ?
            <form onSubmit={this.verify}>
              <label htmlFor="code">Enter the code you were sent: </label>
              <input name='code' type="text" value={this.state.code} onChange={this.handleChange} minLength='4' maxLength='4' />
              <input type="submit" value='Verify' />
              <br />
              <p>Didn't get it? Either there was an error, or you didn't enter the number correctly. Either way, you should delete this account and try again</p>
            </form>
            :
            <button onClick={this.startVerification}>Verify Number</button>
        }
      </div>
    );
  }
}

export default VerifyForm;