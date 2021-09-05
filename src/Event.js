import React, { Component } from 'react';

class Event extends Component {
  state = {
    buttonText: 'Show details',
    show: false
  }

  toggleDetails = () => {
    if (this.state.buttonText === 'Show details'){
      this.setState({ 
        buttonText: 'Hide details',
        show: true
      })
      } else {
      this.setState({ 
      buttonText: 'Show details',
      show: false
      })
    }
  }

  render () {
    const { event } = this.props;
    return (
      <div className="Event">
        <h1 className="title">{event.summary}</h1>
        <p className="start">{event.start.dateTime}</p>
        <p className="timezone">({event.start.timeZone})</p>
        <p className="email">{event.organizer.email}</p>
        <p className="location">{event.location}</p> 
        <div className="details" style={{ display: this.state.show ? "block" : "none"}}>
          <h3 className="subtitle">About event:</h3>
          <a className="link" href={event.htmlLink}>See details on calendar</a>
          <p className="description">{event.description}</p>
        </div> 
        <button className="button" onClick={this.toggleDetails}>{this.state.buttonText}</button>
      </div>
      
    );
  }
}

export default Event;