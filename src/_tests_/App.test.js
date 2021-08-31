import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

// The scope of these tests is the App component
describe('<App /> component', () => {
  let AppWrapper;
  
  beforeAll(() => {  
    AppWrapper = shallow(<App />)
  });

  test('should render the EventList', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('should render the CitySearch component', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

});