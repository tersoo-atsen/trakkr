import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import wait from 'waait';
import { act } from 'react-dom/test-utils';

import ConnectedDashboard, { Dashboard } from './dashboard';
import Loader from '../loader';
import Error from '../error';
import {
  dashboardMocks, dashboardErrorMocks, dashboardNoDataMocks,
} from '../../../__mocks__/graphqlMocks';

const mockStore = configureStore([]);

describe('Dashboard component', () => {
  let wrapper;
  let store;
  let props;
  let connectedDashbord;

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
    wrapper.unmount();
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
  it('Should render activities', async () => {
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
    expect(connectedDashbord.find('Dashboard')).toBeTruthy();
    expect(connectedDashbord.find('.activity-btn-wrapper')).toBeTruthy();
  });
});
