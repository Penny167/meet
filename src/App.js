import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { WarningAlert } from './Alert';

class App extends Component {
  
  state = {
    events: [],
    locations: [],
    numberOfEvents: 12,
    currentLocation: 'All cities',
    warningText: ''
  }

  componentDidMount () {
    this.mounted = true;
    getEvents()
    .then((events) => {
      if (this.mounted) {
        const slicedEvents = events.slice(0, this.state.numberOfEvents);
        this.setState({ events: slicedEvents, locations: extractLocations(events) });
      }
    })
  }

  componentWillUnmount () {
    this.mounted = false;
  }


  updateEvents = (location, eventCount) => {
    getEvents()
    .then((events) => {
      if (location) {
        const locationEvents = location === 'All cities'
        ? events
        : events.filter(event => event.location === location);
        const slicedLocationEvents = locationEvents.slice(0, this.state.numberOfEvents);
        this.setState({
          events: slicedLocationEvents,
          currentLocation: location
        });
      } else {
        const locationEvents = this.state.currentLocation === 'All cities'
        ? events
        : events.filter(event => event.location === this.state.currentLocation);
        const slicedLocationEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: slicedLocationEvents,
          numberOfEvents: eventCount
        });
      }
      if (this.state.numberOfEvents < 33 && this.state.numberOfEvents > this.state.events.length) {
        this.state.events.length === 1 ? 
          this.setState({ warningText: 'There is only 1 event for this location'})
          :this.setState({ warningText: `There are only ${this.state.events.length} events for this location`})
      } else {
        this.setState({ warningText: ''});
      }
    })
  }        


  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <WarningAlert text={this.state.warningText} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
