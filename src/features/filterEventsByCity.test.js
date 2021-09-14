import { loadFeature, defineFeature } from 'jest-cucumber';
const feature = loadFeature('./src/features/filterEventsByCity.feature');
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import mockData from '../mock-data';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

defineFeature(feature, test => {
  
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {});
    let AppWrapper;
    when('the user opens the app', () => { AppWrapper = mount(<App />); });
    then('the user should see the list of upcoming events.', () => {
      AppWrapper.update(); // At what point does componentDidMount() execute? 
      expect(AppWrapper.find('.Event')).toHaveLength(12); // This has to be 12 because we have coded the app to display a default number of events of 12 regardless of locations
      expect(AppWrapper.state().locations).toHaveLength(2); // This tests that the events retrieved are for events from all cities (there are 2 cities within the mock data)
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    let CitySearchWrapper;
    let locations = extractLocations(mockData);
    given('the main page is open', () => {
      CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />)
    });
    when('the user starts typing in the city textbox', () => {
      CitySearchWrapper.find('.city').simulate('change', {target: {value: 'Berlin'}});
    });
    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2); // expect Berlin plus the See all cities option
      expect(CitySearchWrapper.find('.suggestions li').at(0).text()).toBe('Berlin, Germany'); // I have added this to check that the value matches
    });
  });

  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    const AppWrapper = mount(<App />);
    given('user was typing “Berlin” in the city textbox', () => {
//      AppWrapper = await mount(<App />); // I don't know why we use await here but didn't in the first test
      AppWrapper.find('.city').simulate('change', {target: {value: 'Berlin'}});
    });
    and('the list of suggested cities is showing', () => { 
//      AppWrapper.update();
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });
    when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
      AppWrapper.find('.suggestions li').at(0).simulate('click');
    });
    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      expect(AppWrapper.find(CitySearch).state('query')).toBe('Berlin, Germany');
//      expect(AppWrapper.find('.city').text()).toBe('Berlin, Germany'); // why is this not working?
    });
    and('the user should receive a list of upcoming events in that city', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event')).toHaveLength(19); // 19 of the events in the mock data are located in Berlin
    });

  });

})