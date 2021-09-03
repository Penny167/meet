import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import mockData from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  
  beforeAll(() => { 
    EventWrapper = shallow(<Event />)
  });

})