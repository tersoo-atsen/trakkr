import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import LandingPage from './landingPage';
import Button from '../button';

describe('Landing page component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );
  });

  it('Should render correctly', () => {
    const navbar = wrapper.find('nav');
    const buttons = wrapper.find(Button);

    expect(navbar).toBeDefined();
    expect(buttons).toHaveLength(2);
    expect(wrapper.find(LandingPage).length).toBe(1);
  });
});
