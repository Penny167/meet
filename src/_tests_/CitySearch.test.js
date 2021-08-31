import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';

describe('<CitySearch /> component', () => {
  
  test('should render text input with class name city', () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('should render list of city suggestions', () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

});