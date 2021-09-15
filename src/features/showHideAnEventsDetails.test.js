import { loadFeature, defineFeature } from 'jest-cucumber';
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');
import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import mockData from '../mock-data';


defineFeature(feature, test => {
  
  let event = mockData[0]; // Picking first event in the array as an example for testing. All events are rendered the same way by the same component so testing one is sufficient
  let EventWrapper;

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user hasn’t selected an event', () => {});
    when('a list of events is displayed', () => { EventWrapper = shallow(<Event event={event} />)});
    then('the event elements will be collapsed so that no details are shown', () => {
      expect(EventWrapper.state('show')).toBe(false);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('a list of events is displayed', () => { EventWrapper = shallow(<Event event={event} />)});
    when('the user selects an event to see further information', () => {
      EventWrapper.find('.button').simulate('click');
    });
    then('the event expands to show the event details', () => {
      expect(EventWrapper.state('show')).toBe(true);
      expect(EventWrapper.find('.details').prop('style')).toEqual({display: 'block'});
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('an event is expanded to show its details', () => {
      EventWrapper = shallow(<Event event={event} />);
      EventWrapper.find('.button').simulate('click');
    });
    when('a user selects an event to hide its details', () => {
      EventWrapper.find('.button').simulate('click');
    });
    then('the event will collapse so that only high level event information is shown', () => {
      expect(EventWrapper.state('show')).toBe(false);
      expect(EventWrapper.find('.details').prop('style')).toEqual({display: 'none'});
    });
  });

});