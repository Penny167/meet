import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';

// The scope of these tests is the App component
describe('<App /> component', () => {

  test('should render the EventList', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

});