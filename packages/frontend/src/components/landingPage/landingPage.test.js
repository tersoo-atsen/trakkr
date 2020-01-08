import React from 'react';
import { mount } from 'enzyme';

import Landing from './landingPage';

describe('Landing page component', () => {
  it('Should render correctly', () => {
    const wrapper = mount(<Landing />);
    const navbar = wrapper.find('.page-wrapper');
    const buttons = wrapper.find('button');

    expect(navbar).toBeDefined();
    expect(buttons).toHaveLength(2);
  });
});
