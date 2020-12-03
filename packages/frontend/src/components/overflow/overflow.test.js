import React from 'react';
import { mount } from 'enzyme';

import Overflow from './overflow';

describe('Overflow Component', () => {
  let wrapper;
  const e = { preventDefault: jest.fn() };

  beforeEach(() => {
    wrapper = mount(<Overflow />);
  });
  it('Should render overflow component', () => {
    expect(wrapper.instance().state.showMenu).toEqual(false);
    expect(wrapper.find('.overflow-menu').length).toBe(1);
    expect(wrapper.find('.trigger').length).toBe(1);
    expect(wrapper.find('.drop-menu').length).toBe(0);
  });
  it('Should toggle dropdown menu on click', () => {
    wrapper.instance().showMenu(e);
    wrapper.update();
    expect(wrapper.instance().state.showMenu).toEqual(true);
    expect(wrapper.find('.drop-menu').length).toBe(1);
    expect(wrapper.find('.menu-item').length).toBe(2);
    wrapper.instance().showMenu(e);
    wrapper.update();
    expect(wrapper.find('.drop-menu').length).toBe(0);
    expect(wrapper.find('.menu-item').length).toBe(0);
  });
  it('Should toggle dropdown menu on click', () => {
    wrapper.instance().showMenu(e);
    wrapper.update();
    expect(wrapper.instance().state.showMenu).toEqual(true);
    expect(wrapper.find('.drop-menu').length).toBe(1);
    expect(wrapper.find('.menu-item').length).toBe(2);
    wrapper.instance().closeMenu();
    wrapper.update();
    expect(wrapper.instance().state.showMenu).toEqual(false);
    expect(wrapper.find('.drop-menu').length).toBe(0);
    expect(wrapper.find('.menu-item').length).toBe(0);
  });
});
