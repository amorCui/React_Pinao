import React, { Component } from 'react';

import './assets/css/App.css';


import PianoController from './components/PianoController/PianoController'

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <PianoController></PianoController>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      
      </div>
    );
  }
}

export default App;
