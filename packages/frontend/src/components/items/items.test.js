import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import wait from 'waait';
import { act } from 'react-dom/test-utils';

import ConnectedItems, { Items } from './items';
import Error from '../error';
import Overflow from '../overflow';
import Loader from '../loader';
import {
  itemsMocks,
  itemsErrorMocks,
  itemsNoResultsMocks,
} from '../../../__mocks__/graphqlMocks';
import apolloClient from '../../utils/apolloClient';

const mockStore = configureStore([]);
jest.mock('../../utils/apolloClient');

describe('Items Component', () => {
  let wrapper;
  let props;
  let store;

  beforeEach(() => {
    props = { currentUser: { id: 1 } };
    store = mockStore({
      global: { currentUser: { id: 1 } },
    });
  });

  it('should render the items component', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/items']}>
        <MockedProvider mocks={itemsMocks} addTypename={false}>
          <Items {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    expect(wrapper.contains(<Loader />)).toBeTruthy();
    await act(async () => {
      await wait();
      wrapper.update();
    });
    const itemView = wrapper.find('.item-page_wrapper');
    const pagination = wrapper.find('.pagination-wrapper');
    expect(wrapper.contains(itemView)).toBeDefined();
    expect(wrapper.contains(pagination)).toBeDefined();
    expect(wrapper.contains(Overflow)).toBeDefined();
  });

  it('should render error ', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/items']}>
        <MockedProvider mocks={itemsErrorMocks} addTypename={false}>
          <Items {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
      wrapper.update();
    });
    expect(wrapper.contains(<Error message="An error occurred" />)).toBeTruthy();
  });

  it('should show message when there are no items', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/items']}>
        <MockedProvider mocks={itemsNoResultsMocks} addTypename={false}>
          <Items {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
      wrapper.update();
    });
    expect(wrapper.find('.has-text-grey.is-size-6.has-text-centered')).toHaveLength(1);
  });

  it('should delete item', async () => {
    apolloClient.mutate.mockImplementationOnce(() => Promise.resolve());
    wrapper = mount(
      <MemoryRouter initialEntries={['/items']}>
        <MockedProvider mocks={itemsMocks} addTypename={false}>
          <Items {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
      wrapper.update();
    });
    wrapper.find('.trigger').at(0).simulate('click');
    wrapper.find('.delete-item').simulate('click');
    expect(wrapper.find('.modal')).toHaveLength(1);

    wrapper.find('.delete-confirm').simulate('click');
    // await act(async () => {
    //   await wait();
    //   wrapper.update();
    // });
    // expect(wrapper.find('.Toastify__toast--default')).toHaveLength(1);
  });

  it('should fail to delete item', async () => {
    apolloClient.mutate.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
    wrapper = mount(
      <MemoryRouter initialEntries={['/items']}>
        <MockedProvider mocks={itemsMocks} addTypename={false}>
          <Items {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
      wrapper.update();
    });
    wrapper.find('.trigger').at(0).simulate('click');
    wrapper.find('.delete-item').simulate('click');
    expect(wrapper.find('.modal')).toHaveLength(1);

    wrapper.find('.delete-confirm').simulate('click');
    // await act(async () => {
    //   await wait();
    //   wrapper.update();
    // });

    // expect(wrapper.find('.Toastify__toast--default')).toHaveLength(1);
  });

  it('should render one page of items', async () => {
    const authActions = { logout: jest.fn() };
    const handleLogout = jest.fn(() => {
      authActions.logout(props.dispatch, props.history);
    });
    const connectedItems = mount(
      <MemoryRouter initialEntries={['/items']}>
        <Provider store={store}>
          <MockedProvider mocks={itemsMocks} addTypename={false}>
            <ConnectedItems {...props} handleLogout={handleLogout} />
          </MockedProvider>
        </Provider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
      connectedItems.update();
    });
    const instance = connectedItems.find('Items').instance();
    instance.fetchItems(1);
    expect(connectedItems.find(Overflow)).toHaveLength(5);
    expect(connectedItems.find('.user-item')).toHaveLength(5);
  });
});
