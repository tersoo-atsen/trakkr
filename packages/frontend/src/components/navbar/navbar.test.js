import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './navbar';

jest.useFakeTimers();

describe('Navbar component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
  });

  it('Should render correctly', () => {
    const navbar = wrapper.find('.navbar.is-fixed-top.transparent');
    expect(wrapper.children().length).toEqual(1);
    expect(wrapper.contains(navbar)).toBeDefined();
  });

  it('Should not change navbar color on scroll', () => {
    global.scrollY = 30;
    global.document.dispatchEvent(new Event('scroll'));

    wrapper.first().getDOMNode().dispatchEvent(new Event('scroll'));
    jest.runOnlyPendingTimers();
    wrapper.update();
    const navbar = wrapper.find('.navbar.is-fixed-top.transparent');
    expect(navbar.length).toEqual(1);
  });

  it('Should change navbar color on scroll', () => {
    global.scrollY = 200;
    global.document.dispatchEvent(new Event('scroll'));

    wrapper.first().getDOMNode().dispatchEvent(new Event('scroll'));
    jest.runOnlyPendingTimers();
    wrapper.update();
    const navbar = wrapper.find('.navbar.is-fixed-top.colored');
    expect(navbar.length).toEqual(1);
  });
});
