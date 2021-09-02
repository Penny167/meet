import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import mockData from '../mock-data';

// The scope of these tests is the EventList component
describe('<EventList /> component', () => {

  test('should render correct number of events', () => { // Testing existence and completeness of list
    const EventListWrapper = shallow(<EventList events={mockData}/>); // events will be passed as props from App
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  });

});