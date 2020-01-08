import React from 'react';
import { mount } from 'enzyme';

import Footer from './footer';

describe('Footer component', () => {
  let component;
  beforeEach(() => {
    component = mount(<Footer />);
  });

  it('Should render correctly', () => {
    const footer = component.find('.footer');
    expect(component.children().length).toEqual(1);
    expect(component.contains(footer)).toBeDefined();
  });
});
