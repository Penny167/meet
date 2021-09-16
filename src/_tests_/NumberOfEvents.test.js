import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  
  beforeAll(() => {  
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>)
  });

  test('should render text input with class name numberOfEvents', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('initial eventsNumber state should be 12', () => {
    expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(12);
  })

  test('number displayed in input should be value of eventsNumber state', () => {
    NumberOfEventsWrapper.setState( { eventsNumber: 11 })
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('value')).toBe(11);
  })

  test('expect when user types into input the eventsNumber state changes', () => {
    NumberOfEventsWrapper.setState({ eventsNumber: 12 });
    const eventObject = { target: { value: 10 }}; // 10 selected just as an example for testing purposes
    NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(10);
  })

});