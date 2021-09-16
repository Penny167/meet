import React, { Component } from 'react';

class Event extends Component {
  state = {
    show: false
  }

  toggleDetails = () => {
    this.setState({ show: !this.state.show });
  }

  render () {
    const { event } = this.props;
    return (
      <div className="Event">
        <h2 className="title">{event.summary}</h2>
        <p className="start">{event.start.dateTime}
          <span className="timezone"> ({event.start.timeZone})</span>
        </p>
        <p className="email">{event.organizer.email}
        <span className="location"> | {event.location}</span>
        </p>
        <div className="details" style={{ display: this.state.show ? "block" : "none"}}>
          <h3 className="subtitle">About event:</h3>
          <a className="link" href={event.htmlLink}>See details on calendar</a>
          <p className="description">{event.description}</p>
        </div> 
        <button className="button" onClick={this.toggleDetails}>{this.state.show ? "Hide details" : "Show details"}</button>
      </div>
      
    );
  }
}

export default Event;