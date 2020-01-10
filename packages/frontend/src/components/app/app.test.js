import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import App from './app';
import LandingPage from '../landingPage';
import NotFoundPage from '../notFoundPage';

describe('App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
  });

  it('Should render correctly', () => {
    const navbar = wrapper.find('.navbar');

    expect(navbar).toBeDefined();
    expect(wrapper.find(LandingPage).length).toBe(1);
    expect(wrapper.find(NotFoundPage).length).toBe(0);
  });

  it('Should render correctly', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/test']}>
        <App />
      </MemoryRouter>,
    );

    expect(wrapper.find(LandingPage).length).toBe(0);
    expect(wrapper.find(NotFoundPage).length).toBe(1);
  });
});
