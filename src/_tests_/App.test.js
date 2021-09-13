import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import mockData from '../mock-data';
import { extractLocations, getEvents } from '../api';

// The scope of these tests is the App component
describe('<App /> component', () => {
  let AppWrapper;
  
  beforeAll(() => {  
    AppWrapper = shallow(<App />)
  });

  test('should render the EventList component', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('should render the CitySearch component', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('should render the NumberOfEvents component', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  })

});

// Creating a new scope for integration testing
describe('<App /> integration', () => {
  
  test('App should pass "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  })

  test('App should pass "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  })

  test('App should get list of events matching city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  })
  
  test('App should get all events if user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click'); // See all cities will always be the last position ie length minus one
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  })

  test('App should display only 12 events when first rendered', async () => { // I am selecting 12 as my default number
    const AppWrapper = mount(<App />);
    expect(AppWrapper.state('numberOfEvents')).toBe(12);
    expect(AppWrapper.state('events')).toEqual([]);
    const testSlicedEvents = mockData.slice(0,12);
    await getEvents();
    expect(AppWrapper.state('events')).toEqual(testSlicedEvents);
    expect(AppWrapper.state('events')).toHaveLength(12);
    AppWrapper.unmount();
  })

  test('App should update number of events displayed to match number selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 4 }}; // Selecting 4 as a new number for test purposes
    NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', eventObject);
    const newNumber = NumberOfEventsWrapper.state().eventsNumber;
    expect(newNumber).toBe(4);
    await getEvents();
    expect(AppWrapper.state('events')).toHaveLength(newNumber);
    AppWrapper.unmount();
  })

  test('Events displayed should reflect both the city selected AND the number of events selected', async () => {
    
  })

});
