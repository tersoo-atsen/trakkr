import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ConnectedNavbar, { Navbar } from './navbar';
import NavItems from '../navItems';

const mockStore = configureStore([]);
jest.useFakeTimers();

describe('Navbar component', () => {
  let wrapper;
  let store;
  let props;
  let connectedNavbar;

  beforeEach(() => {
    props = {
      currentUser: {},
      loggedIn: false,
      history: {
        push: jest.fn(),
      },
      dispatch: jest.fn(),
    };

    wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <Navbar {...props} />
      </MemoryRouter>,
    );

    store = mockStore({
      global: {
        loading: false,
        loggedIn: true,
        error: [],
        currentUser: { firstName: 'John', lastName: 'Doe' },
      },
    });

    connectedNavbar = mount(
      <MemoryRouter initialEntries={['/login']}>
        <Provider store={store}>
          <ConnectedNavbar {...props} />
        </Provider>
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    const navbar = wrapper.find('.navbar.is-fixed-top.transparent');
    expect(wrapper.children().length).toEqual(1);
    expect(wrapper.contains(navbar)).toBeDefined();
    expect(wrapper.find(NavItems).length).toEqual(1);
  });

  it('should not change navbar color on scroll', () => {
    global.scrollY = 30;
    global.document.dispatchEvent(new Event('scroll'));

    wrapper.first().getDOMNode().dispatchEvent(new Event('scroll'));
    jest.runOnlyPendingTimers();
    wrapper.update();
    const navbar = wrapper.find('.navbar.is-fixed-top.transparent');
    expect(navbar.length).toEqual(1);
  });

  it('should change navbar color on scroll', () => {
    global.scrollY = 200;
    global.document.dispatchEvent(new Event('scroll'));

    wrapper.first().getDOMNode().dispatchEvent(new Event('scroll'));
    jest.runOnlyPendingTimers();
    wrapper.update();
    const navbar = wrapper.find('.navbar.is-fixed-top.colored');
    expect(navbar.length).toEqual(1);
  });

  it('should show the username, profile photo and menu when user is signed on', () => {
    expect(connectedNavbar.contains('user_name')).toBeDefined();
    expect(connectedNavbar.contains('dropdown__button')).toBeDefined();
  });

  it('should open dropdown menu when button is clicked', () => {
    connectedNavbar.find('.dropdown__button').simulate('click');
    expect(connectedNavbar.find(Navbar).instance().state.showDropdown).toBe(true);
  });

  it('should close dropdown menu when button is toggled', () => {
    connectedNavbar.find('.dropdown__button').simulate('click');
    connectedNavbar.find('.dropdown__button').simulate('click');
    expect(connectedNavbar.find(Navbar).instance().state.showDropdown).toBe(false);
  });

  it('should close menu if click is outside of dropdown', () => {
    connectedNavbar.find('.dropdown__button').simulate('click');
    global.document.dispatchEvent(new Event('mouseup'));
    expect(connectedNavbar.find(Navbar).instance().state.showDropdown).toBe(false);
  });

  it('should navigate user to home page on log out', () => {
    connectedNavbar.find('.dropdown__button').simulate('click');
    connectedNavbar.find('.dropdown__logout_button').simulate('click');
    connectedNavbar.find(Navbar).update();
    const history = connectedNavbar.find('Router').prop('history');
    expect(history.location.pathname).toBe('/');
  });
});
