import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

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

});