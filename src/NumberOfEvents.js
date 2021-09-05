import React, { Component } from 'react';

class NumberOfEvents extends Component {
  
  state = { 
    eventsNumber: 32
  }

  setEventNumber = (e) => {
    this.setState({
      eventsNumber: e.target.value
    })
  } 

  render() {
  return(
    <input className="numberOfEvents" value={this.state.eventsNumber} onChange={this.setEventNumber}></input>
  );
  }
}

export default NumberOfEvents;