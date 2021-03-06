import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import AlertsList from './components/AlertsList';
import Signup from './components/Signup';
import User from './components/User';
import styled from 'styled-components';

const Body = styled.div`
  margin: 10% auto;
  width: 100vw;
  background-color: white;

  padding: 25px 10px;
  box-shadow: 2px 2px 5px black;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1{
    font-size: 3em;
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

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          {/* <h1>Text - Alerts</h1> */}
          <Body>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route path='/:userId/alerts' component={AlertsList} />
              <Route path='/:userId' component={User} />
            </Switch>
          </Body>
        </div>
      </Router>
    );
  }
}

export default App;
