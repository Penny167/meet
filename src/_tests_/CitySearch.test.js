import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import mockData from '../mock-data';

describe('<CitySearch /> component', () => {
  
  let locations, CitySearchWrapper;
  
  beforeAll(() => { 
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />)
  });

  test('should render text input with class name city', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('should render list of city suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  test('value of text input should equal query state of CitySearch component', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('query state should update dynamically when user types into text input', () => {
    CitySearchWrapper.setState({ query: 'Munich' });
    const eventObject = { target: { value: 'Berlin' }};
    CitySearchWrapper.find('.city').simulate('change', eventObject); // Simulates input value updating to Berlin when user types
    expect(CitySearchWrapper.state('query')).toBe('Berlin'); // Expect this to update the query state
  });

  test('list of suggestions rendered should match list in component state', () => {
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations }); // set the suggestions state with mock data
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
    }
  });

  test('suggestions list items match location entered in query string', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] });
    CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' }});
    const query = CitySearchWrapper.state('query');
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1; // why can't we just say location === query?
    });
    expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
  });

  test('value of query state should change when user clicks on suggestion', () => {
    CitySearchWrapper.setState({ query: 'Berlin' });
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
  });

});