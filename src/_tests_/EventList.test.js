import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';

// The scope of these tests is the EventList component
describe('<EventList /> component', () => {

  test('should render correct number of events', () => { // Testing existence and completeness of list
    const EventListWrapper = shallow(<EventList events={[{id:1},{id:2},{id:3},{id:4}]}/>); // events will be passed as props from App
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });

});