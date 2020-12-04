import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import wait from 'waait';
import { act } from 'react-dom/test-utils';

import ConnectedMainLayout, { MainLayout } from './mainLayout';
import Sidebar from '../sidebar';
import Usermenu from '../userMenu';
import Error from '../error';

const mockStore = configureStore([]);
const resizeWindow = (x, y) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
};

describe('MainLayout component', () => {
  let wrapper;
  let store;
  let props;
  let connectedMainLayout;
  let instance;

  beforeEach(() => {
    props = {
      currentUser: { id: 1 },
      history: {
        push: jest.fn(),
      },
      dispatch: jest.fn(),
      children: <Error message="inside test" />,
    };
    store = mockStore({
      global: {
        currentUser: { id: 1 },
      },
    });
  });
  it('Should render sidebar layout correctly', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MainLayout {...props} />
      </MemoryRouter>,
    );
    wrapper.update();
    const mainLayout = wrapper.find('.main-layout-wrapper');
    expect(wrapper.contains(mainLayout)).toBeDefined();
    expect(wrapper.find(Usermenu).length).toEqual(1);
    expect(wrapper.find(Sidebar).length).toEqual(1);
    wrapper.unmount();
  });
  it('Should render dashboard on larger display', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MainLayout {...props} />
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    instance = wrapper.find('MainLayout').instance();
    wrapper.update();
    instance.setState({ showSidebar: false });
    wrapper.update();
    expect(instance.state.showSidebar).toBe(false);
    wrapper.unmount();
  });
  it('Should render dropdown menu when button is clicked', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MainLayout {...props} />
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    wrapper.update();
    instance = wrapper.find('MainLayout').instance();
    expect(instance.state.showDropdown).toBe(false);
    wrapper.find('.dropdown__button').simulate('click');
    const dropdown = wrapper.find('.dropdown__content');
    expect(instance.state.showDropdown).toBe(true);
    expect(dropdown.exists()).toBeTruthy();
  });
  it('Should close dropdown menu when dashboard content area is clicked', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MainLayout {...props} />
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    wrapper.update();
    wrapper.find('.dropdown__button').simulate('click');
    let dropdown = wrapper.find('.dropdown__content');
    expect(dropdown.exists()).toBeTruthy();
    wrapper.find('.main-layout_wrapper').simulate('click');
    global.document.dispatchEvent(new Event('mouseup'));
    wrapper.update();
    dropdown = wrapper.find('.dropdown__content');
    expect(dropdown.exists()).toBeFalsy();
  });
  it('Should render sidebar when button is clicked', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MainLayout {...props} />
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    resizeWindow(768, 1024);
    wrapper.update();
    instance = wrapper.find('MainLayout').instance();
    expect(wrapper.find(Sidebar).length).toEqual(0);
    wrapper.find('.button.sidebar-trigger').simulate('click');
    expect(wrapper.find(Sidebar).length).toEqual(1);
    resizeWindow(1280, 950);
  });
  it('Should render call the logout method ', async () => {
    const authActions = { logout: jest.fn() };
    const handleLogout = jest.fn(() => {
      authActions.logout(props.dispatch, props.history);
    });
    connectedMainLayout = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Provider store={store}>
          <ConnectedMainLayout {...props} handleLogout={handleLogout} />
        </Provider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    connectedMainLayout.update();
    instance = connectedMainLayout.find('MainLayout').instance();
    const spy = jest.spyOn(instance, 'handleLogout');
    connectedMainLayout.find('.dropdown__button').simulate('click');
    connectedMainLayout.find('.dropdown__logout_button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
