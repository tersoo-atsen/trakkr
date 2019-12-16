import React from 'react';
import { mount } from 'enzyme';

import Navbar from './navbar';

describe('App component', () => {
  it('Should render correctly', () => {
    const wrapper = mount(<Navbar />);
    const navbar = wrapper.find('.navbar');
    const buttons = wrapper.find('button');

    expect(navbar).toBeDefined();
    expect(buttons).toHaveLength(2);
  });
});
