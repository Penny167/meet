import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

// The scope of these tests is the App component
describe('<App /> component', () => {

  test('should render a list of events', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

});