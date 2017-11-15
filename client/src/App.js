import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import axios from 'axios'
import Login from './components/Login';
import AlertsList from './components/AlertsList';
import Signup from './components/Signup';
import User from './components/User';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/:userId/alerts' component={AlertsList} />
            <Route path='/:userId' component={User} />
          </Switch>
          <h4>
            Currenty, this app is a prototype.
            <br />
            I recommend deleting your user after trying this out.
            <br />
            And don't use a real password
          </h4>
        </div>
      </Router>
    );
  }
}

export default App;
