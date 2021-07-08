import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Overflow from './overflow';

describe('Overflow Component', () => {
  let wrapper;
  let component;
  const e = { preventDefault: jest.fn() };
  const props = {
    id: 20,
    toggleModal: jest.fn(),
  };
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <Overflow {...props} />
      </MemoryRouter>,
    );
    wrapper = component.find('Overflow');
  });
  it('should render overflow component', () => {
    expect(wrapper.instance().state.showMenu).toEqual(false);
    expect(wrapper.find('.overflow-menu').length).toBe(1);
    expect(wrapper.find('.trigger').length).toBe(1);
    expect(wrapper.find('.drop-menu').length).toBe(0);
    component.unmount();
  });
  it('should toggle dropdown menu on click', () => {
    wrapper.instance().showMenu(e);
    wrapper.update();
    expect(wrapper.instance().state.showMenu).toEqual(true);
    wrapper.instance().showMenu(e);
    wrapper.update();
    expect(wrapper.instance().state.showMenu).toEqual(false);
    wrapper.instance().showMenu(e);
    wrapper.update();
    expect(wrapper.instance().state.showMenu).toEqual(true);
    wrapper.instance().closeMenu();
    wrapper.update();
    expect(wrapper.instance().state.showMenu).toEqual(false);
  });
});
