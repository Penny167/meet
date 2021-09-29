import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  
  state = { 
    eventsNumber: 12,
    errorText: ''
  }

  setEventNumber = (e) => {
    if (e.target.value < 1 || e.target.value > 32) {
      this.setState({ 
        eventsNumber: e.target.value,
        errorText: 'Please select a number between 1 and 32'
      });
    } else {
    this.setState({ 
      eventsNumber: e.target.value,
      errorText: ''
    });
    this.props.updateEvents(null, e.target.value);
    } 
  }

  render() {
    return(
      <div>
        <p>Number of events to display:</p>
        <input className="numberOfEvents" value={this.state.eventsNumber} onChange={this.setEventNumber}></input>
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;