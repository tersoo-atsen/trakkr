import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Footer from './footer';

describe('Footer component', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter initialEntries={['/']}>
        <Footer />
      </MemoryRouter>,
    );
  });

  it('Should render correctly', () => {
    const footer = component.find('.footer');
    expect(component.children().length).toEqual(1);
    expect(component.contains(footer)).toBeDefined();
  });
});
