import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

class App extends Component {
  
  state = {
    events: [],
    locations: [],
    numberOfEvents: 12,
    currentLocation: ''
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

  updateNumberOfEvents = (eventCount) => {
    getEvents()
    .then((events) => {
      const eventCountEvents = events.slice(0, eventCount);
      this.setState({ events: eventCountEvents });
    })
  }

  updateEvents = (location) => {
    getEvents()
    .then((events) => {
      if (location === 'all') {
        const allLocationsSliced = events.slice(0, this.state.numberOfEvents);
        this.setState(
          { events: allLocationsSliced,
            currentLocation: 'all'
          }
        );
      } else {
      const locationEvents = events.filter(event => event.location === location);
      const slicedLocationEvents = locationEvents.slice(0, this.state.numberOfEvents);
      this.setState(
        { events: slicedLocationEvents,
          currentLocation: location
        }
      );
      }
    })
  } 

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
