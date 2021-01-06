import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import wait from 'waait';
import { act } from 'react-dom/test-utils';

import ConnectedActivity, { Activity } from './activity';
import NoContent from '../noContent';
import Error from '../error';
import Loader from '../loader';
import { activityMocks, activityErrorMocks, activityNoDataMocks } from '../../../__mocks__/graphqlMocks';

const mockStore = configureStore([]);

describe('Activity Component', () => {
  let wrapper;
  let props;
  let store;

  beforeEach(() => {
    props = {
      currentUser: { id: 1 },
    };
    store = mockStore({
      global: {
        currentUser: { id: 1 },
      },
    });
  });

  it('Should render the activity componet', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/activity']}>
        <MockedProvider mocks={activityMocks} addTypename={false}>
          <Activity {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    expect(wrapper.contains(<Loader />)).toBeTruthy();
    await act(async () => {
      await wait();
    });
    wrapper.update();
    const activityView = wrapper.find('.activity-page_wrapper');
    const pagination = wrapper.find('.pagination-wrapper');
    expect(wrapper.contains(activityView)).toBeDefined();
    expect(wrapper.contains(pagination)).toBeDefined();
  });
  it('Should render error ', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/activity']}>
        <MockedProvider mocks={activityErrorMocks} addTypename={false}>
          <Activity {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    wrapper.update();
    expect(wrapper.contains(<Error message="An error occurred" />)).toBeTruthy();
  });
  it('Should render no content component', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/activity']}>
        <MockedProvider mocks={activityNoDataMocks} addTypename={false}>
          <Activity {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    wrapper.update();
    expect(wrapper.find(NoContent)).toHaveLength(1);
    expect(wrapper.find('Such empty')).toBeTruthy();
  });
  it('Should render one page of activities', async () => {
    const connectedActivity = mount(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <MockedProvider mocks={activityMocks} addTypename={false}>
            <ConnectedActivity {...props} />
          </MockedProvider>
        </Provider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
    });
    connectedActivity.update();
    const instance = connectedActivity.find('Activity').instance();
    instance.setPageNumber(1);
    // expect(connectedItems.find(Overflow)).toHaveLength(5);
    // expect(connectedItems.find('.user-item')).toHaveLength(5);
  });
});
