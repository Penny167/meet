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
      <div>
        <p>Number of events to display:</p>
        <input className="numberOfEvents" value={this.state.eventsNumber} onChange={this.setEventNumber}></input>
      </div>
    );
  }
}

export default NumberOfEvents;