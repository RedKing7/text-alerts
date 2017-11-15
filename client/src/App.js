import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import axios from 'axios'
import Login from './components/Login';
import AlertsList from './components/AlertsList';
import Signup from './components/Signup';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/:userId/alerts' component={AlertsList} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
