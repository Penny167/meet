import { loadFeature, defineFeature } from 'jest-cucumber';
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { getEvents } from '../api'; // Clean this up after final questions resolved
import NumberOfEvents from '../NumberOfEvents';
import CitySearch from '../CitySearch';

defineFeature(feature, test => {
  
  let AppWrapper = mount(<App /> );

  test('When user hasn’t specified a number, 12 is the default number', ({ given, when, then }) => {
    given('a user hasn’t specified the number of events', () => {});
    when('the list of events is displayed', () => { AppWrapper.update(); });
    then('the default number of events is 12', () => {
      expect(AppWrapper.find('.Event')).toHaveLength(12);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then, and }) => {
    given('the list of events is displayed', () => { AppWrapper.update(); });
    and('the user has selected a city (or all cities)', () => {  
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      CitySearchWrapper.instance().handleItemClicked('Berlin, Germany');
    });
    when('the user enters the number of events that they want to see', () => {
      AppWrapper.find('.numberOfEvents').simulate('change', { target: { value: 6 } }); // 6 selected as example
    });
    then('the number of events changes to match the number selected by the user', async () => {
  //    await getEvents(); // This is not actually needed
      AppWrapper.update();
      expect(AppWrapper.find(NumberOfEvents).state('eventsNumber')).toBe(6);
      expect(AppWrapper.find('.numberOfEvents').prop('value')).toBe(6);
      expect(AppWrapper.find('.Event')).toHaveLength(6);
    });
    and('the events will be for the location currently displayed', () => { 
      expect(AppWrapper.find('.location').at(0).text()).toBe(" | " + 'Berlin, Germany'); // In the full mock data the location at position 0 is London 
    });  
  });
  
});