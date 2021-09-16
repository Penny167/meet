import React, { Component } from 'react';

class NumberOfEvents extends Component {
  
  state = { 
    eventsNumber: 12
  }

  setEventNumber = (e) => {
    this.setState({ eventsNumber: e.target.value });
    this.props.updateEvents(null, e.target.value);
  } 

  render() {
  return(
    <input className="numberOfEvents" value={this.state.eventsNumber} onChange={this.setEventNumber}></input>
  );
  }
}

export default NumberOfEvents;