import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import mockData from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  let event = mockData[0]; // This will simulate the event data passed as props to each Event by the EventList component
  
  beforeAll(() => { 
    EventWrapper = shallow(<Event event={event}/>)
  });

  test('each event rendered should have a title', () => {
    expect(EventWrapper.find('.title')).toHaveLength(1); 
  });

  test('title should be value of summary field for each event', () => {
    const title = event.summary;
    expect(EventWrapper.find('.title').text()).toBe(title); 
  });

  test('each event rendered should have a start time', () => {
    expect(EventWrapper.find('.start')).toHaveLength(1); 
  });

  test('start time should be value of dateTime field for each event', () => { // This test has been updated post styling because I want timezone to sit inline with start time
    const start = event.start.dateTime;
    const timeZone = event.start.timeZone;
    expect(EventWrapper.find('.start').text()).toBe(start + " " + '(' + timeZone + ')'); 
  });

  test('there should be a time zone rendered for each event', () => {
    expect(EventWrapper.find('.timezone')).toHaveLength(1); 
  });

  test('time zone should be value of timeZone field for each event', () => {
    const timeZone = event.start.timeZone;
    expect(EventWrapper.find('.timezone').text()).toBe(" " + '(' + timeZone + ')'); 
  });

  test('there should be an organizer email rendered for each event', () => {
    expect(EventWrapper.find('.email')).toHaveLength(1); 
  });

  test('email should be value of organizer email field for each event', () => { // This test has been updated post styling because I want location to sit inline with email
    const email = event.organizer.email;
    const location = event.location;
    expect(EventWrapper.find('.email').text()).toBe(email + " | " + location); 
  });

  test('there should be a location rendered for each event', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1); 
  });

  test('location should be value of location field for each event', () => {
    const location = event.location;
    expect(EventWrapper.find('.location').text()).toBe(" | " + location); 
  });

  test('there should be a show details button rendered for each event', () => {
    expect(EventWrapper.find('.button')).toHaveLength(1); 
  });

  test('there should be a container with additional event details for each event', () => {
    expect(EventWrapper.find('.details')).toHaveLength(1);
  });

  test('there should be a subtitle rendered for each event', () => {
    expect(EventWrapper.find('.subtitle')).toHaveLength(1); 
  });

  test('subtitle should say: About event:', () => {
    const subtitle = 'About event:';
    expect(EventWrapper.find('.subtitle').text()).toBe(subtitle); 
  });

  test('there should be a link to the event on the google calendar rendered for each event', () => {
    expect(EventWrapper.find('.link')).toHaveLength(1); 
  });

  test('Link should say: See details on calendar:', () => {
    const linkText = 'See details on calendar';
    expect(EventWrapper.find('.link').text()).toBe(linkText); 
  });

  test('Link should link to htmlLink of specified event', () => {
    const link = event.htmlLink;
    expect(EventWrapper.find('a').prop('href')).toBe(link); 
  });

  test('there should be a description rendered for each event', () => {
    expect(EventWrapper.find('.description')).toHaveLength(1); 
  });

  test('description should be value of description field', () => {
    const description = event.description;
    expect(EventWrapper.find('.description').text()).toBe(description); 
  });

  test('button text should say Show Details when show state is false', () => {
    EventWrapper.setState({ show: false});
    expect(EventWrapper.find('.button').text()).toBe('Show details');
  });

  test('if button is clicked in default position button text should change to Hide details', () => {
    EventWrapper.setState({ show: false});
    EventWrapper.find('.button').simulate('click');
    expect(EventWrapper.find('.button').text()).toBe('Hide details');
  })

  test('details container style attribute should equal display: none when show state is false', () => {
    EventWrapper.setState({ show: false});
    expect(EventWrapper.find('.details').prop('style')).toEqual({display: 'none'});
  })

  test('details container style attribute should equal display: block when show state is true', () => {
    EventWrapper.setState({ show: true});
    expect(EventWrapper.find('.details').prop('style')).toEqual({display: 'block'});
  })

  test('if button is clicked in default/collapsed position show state should change to true', () => {
    EventWrapper.setState({ show: false });
    EventWrapper.find('.button').simulate('click');
    expect(EventWrapper.state('show')).toBe(true);
  }) 

  test('if button is clicked in expanded position show state should change back to false', () => {
    EventWrapper.setState({ show: true });
    EventWrapper.find('.button').simulate('click');
    expect(EventWrapper.state('show')).toBe(false);
  })

  test('if button is clicked in expanded position button text should change back to Show details', () => {
    EventWrapper.setState({ show: true});
    EventWrapper.find('.button').simulate('click');
    expect(EventWrapper.find('.button').text()).toBe('Show details');
  })

});