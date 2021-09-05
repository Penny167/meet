import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  
  beforeAll(() => {  
    NumberOfEventsWrapper = shallow(<NumberOfEvents />)
  });

  test('should render text input with class name numberOfEvents', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('initial eventsNumber state should be 32', () => {
    expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(32);
  })

  test('number displayed in input should be value of eventsNumber state', () => {
    NumberOfEventsWrapper.setState( { eventsNumber: 32 })
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('value')).toBe(32);
  })

  test('expect when user types into input the eventsNumber state changes', () => {
    NumberOfEventsWrapper.setState({ eventsNumber: 32 });
    const eventObject = { target: { value: 12 }};
    NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(12);
  })

});