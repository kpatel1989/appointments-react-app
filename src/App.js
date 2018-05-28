import React, { Component } from 'react';
import './App.css';
import CalendarContainer from './containers/calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 className="App-title">Appointments</h1>
          <CalendarContainer/>
      </div>
    );
  }
}

export default App;
