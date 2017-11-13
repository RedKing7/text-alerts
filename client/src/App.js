import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {

  test_twilio = async () => {
    try {
      let response = await axios.get('/test')
      console.log(response.data)
    } catch (err) { console.log(err) }
  }

  render() {
    return (
      <div>
        <h1>Hello from React!</h1>
        <button onClick={this.test_twilio}>test</button>
      </div>
    );
  }
}

export default App;
