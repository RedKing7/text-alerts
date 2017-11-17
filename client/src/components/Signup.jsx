import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const FormDiv = styled.form`
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const InputDiv = styled.div`
  text-align: center;
  margin: 10px;
  font-size: 1.3em;
  input{
    text-align: center;
    font-size: 1.2em;
    background-color: rgba(168, 223, 255, .4);
  }
`

class Signup extends Component {
  state = {
    user: {
      name: 'name',
      phone_number: 'xxx-xxx-xxxx',
    },
    userId: '',
    redirect: false
  }

  createUser = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`/api/users/`, this.state.user);
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
      return <Redirect to={`/${this.state.userId}/`} />
    }
    return (
      <div>
        <h1>Create User</h1>
        <FormDiv onSubmit={this.createUser}>
          <InputDiv>
            <label htmlFor="name">Name</label>
            <br />
            <input
              name='name'
              type="text"
              onChange={this.handleChange}
              value={this.state.user.name}
              required />
          </InputDiv>
          <InputDiv>
            <label htmlFor="phone_number">Phone Number<br />(123-456-7890)</label>
            <br />
            <input
              name='phone_number'
              type="text"
              maxLength='12'
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={this.handleChange}
              value={this.state.user.phone_number}
              required />
          </InputDiv>
          <input className='submit' type="submit" />
        </FormDiv>
        <br />
        <Link to='/'>Cancel</Link>
      </div>
    );
  }
}
export default Signup;