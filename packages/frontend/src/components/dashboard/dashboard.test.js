import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import wait from 'waait';
import { act } from 'react-dom/test-utils';

import ConnectedDashboard, { Dashboard } from './dashboard';
import Sidebar from '../sidebar';
import Usermenu from '../userMenu';
import Loader from '../loader';
import Error from '../error';
import {
  dashboardMocks, dashboardErrorMocks, dashboardLongResponseMocks, dashboardNoDataMocks,
} from '../../../__mocks__/graphqlMocks';

const mockStore = configureStore([]);
const resizeWindow = (x, y) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
};
describe('Dashboard component', () => {
  let wrapper;
  let store;
  let props;
  let connectedDashbord;
  let instance;

  beforeEach(() => {
    props = {
      currentUser: { id: 1 },
      history: {
        push: jest.fn(),
      },
      dispatch: jest.fn(),
    };
    store = mockStore({
      global: {
        currentUser: { id: 1 },
      },
    });
  });
  it('Should render dashboard correctly', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MockedProvider mocks={dashboardMocks} addTypename={false}>
          <Dashboard {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    expect(wrapper.contains(<Loader />)).toBeTruthy();
    await act(async () => {
      await wait();
    });
    wrapper.update();
    const dashboard = wrapper.find('.dashboard-wrapper');
    expect(wrapper.contains(dashboard)).toBeDefined();
    expect(wrapper.find(Usermenu).length).toEqual(1);
    expect(wrapper.find(Sidebar).length).toEqual(1);
    wrapper.unmount();
  });
  it('Should not render dashboard correctly on larger display', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MockedProvider mocks={dashboardMocks} addTypename={false}>
          <Dashboard {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    instance = wrapper.find('Dashboard').instance();
    wrapper.update();
    instance.setState({ showSidebar: false });
    wrapper.update();
    expect(instance.state.showSidebar).toBe(false);
    wrapper.unmount();
  });
  it('Should render dropdown menu when button is clicked', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MockedProvider mocks={dashboardMocks} addTypename={false}>
          <Dashboard {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    wrapper.update();
    instance = wrapper.find('Dashboard').instance();
    expect(instance.state.showDropdown).toBe(false);
    wrapper.find('.dropdown__button').simulate('click');
    const dropdown = wrapper.find('.dropdown__content');
    expect(instance.state.showDropdown).toBe(true);
    expect(dropdown.exists()).toBeTruthy();
  });
  it('Should close dropdown menu when dashboard content area is clicked', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MockedProvider mocks={dashboardMocks} addTypename={false}>
          <Dashboard {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    wrapper.update();
    wrapper.find('.dropdown__button').simulate('click');
    let dropdown = wrapper.find('.dropdown__content');
    expect(dropdown.exists()).toBeTruthy();
    wrapper.find('.dashboard-content').simulate('click');
    global.document.dispatchEvent(new Event('mouseup'));
    wrapper.update();
    dropdown = wrapper.find('.dropdown__content');
    expect(dropdown.exists()).toBeFalsy();
  });
  it('Should render sidebar when button is clicked', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MockedProvider mocks={dashboardMocks} addTypename={false}>
          <Dashboard {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    resizeWindow(768, 1024);
    wrapper.update();
    instance = wrapper.find('Dashboard').instance();
    expect(wrapper.find(Sidebar).length).toEqual(0);
    wrapper.find('.button.sidebar-trigger').simulate('click');
    expect(wrapper.find(Sidebar).length).toEqual(1);
    resizeWindow(1280, 950);
  });
  it('Should render error ', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MockedProvider mocks={dashboardErrorMocks} addTypename={false}>
          <Dashboard {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    wrapper.update();
    expect(wrapper.contains(<Error message="An error occurred" />)).toBeTruthy();
  });
  it('Should shorten activity array ', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MockedProvider mocks={dashboardLongResponseMocks} addTypename={false}>
          <Dashboard {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    wrapper.update();
    expect(dashboardLongResponseMocks[0].result.data.getUserActivities.length > 5).toBeTruthy();
    expect(wrapper.find('.activity')).toHaveLength(5);
  });
  it('Should render not data message ', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MockedProvider mocks={dashboardNoDataMocks} addTypename={false}>
          <Dashboard {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    wrapper.update();
    expect(wrapper.find('Such empty')).toBeTruthy();
  });
  it('Should render call the logout method ', async () => {
    const authActions = { logout: jest.fn() };
    const handleLogout = jest.fn(() => {
      authActions.logout(props.dispatch, props.history);
    });
    connectedDashbord = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Provider store={store}>
          <MockedProvider mocks={dashboardMocks} addTypename={false}>
            <ConnectedDashboard {...props} handleLogout={handleLogout} />
          </MockedProvider>
        </Provider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    connectedDashbord.update();
    instance = connectedDashbord.find('Dashboard').instance();
    const spy = jest.spyOn(instance, 'handleLogout');
    connectedDashbord.find('.dropdown__button').simulate('click');
    connectedDashbord.find('.dropdown__logout_button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
