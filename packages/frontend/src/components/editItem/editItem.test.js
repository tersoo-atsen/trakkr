import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import wait from 'waait';
import { act } from 'react-dom/test-utils';

import ConnectedEditItem, { EditItem } from './editItem';
import Loader from '../loader';
import Error from '../error';
import {
  editItemMocks,
  editItemErrorMocks,
  editItemSubmitErrorMocks,
  sigResponse,
} from '../../../__mocks__/graphqlMocks';
import apolloClient from '../../utils/apolloClient';

const mockStore = configureStore([]);
jest.mock('../../utils/apolloClient');

describe('Edit Item Component', () => {
  let wrapper;
  let instance;
  global.fetch = jest.fn();
  const props = {
    dispatch: jest.fn,
    history: {
      push: jest.fn,
      location: {
        pathname: '/edit-item/30',
      },
    },
  };
  const store = mockStore({ global: { currentUser: { id: 1 } } });
  store.dispatch = jest.fn();
  it('should render the edit item component', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/edit-item']}>
        <MockedProvider mocks={editItemMocks} addTypename={false}>
          <EditItem {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    expect(wrapper.contains(<Loader />)).toBeTruthy();
    await act(async () => {
      await wait();
      wrapper.update();
    });
    const itemView = wrapper.find('.add-item-page_wrapper');
    expect(wrapper.contains(itemView)).toBeDefined();
  });
  it('should render error ', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/edit-item']}>
        <MockedProvider mocks={editItemErrorMocks} addTypename={false}>
          <EditItem {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
      wrapper.update();
    });
    expect(wrapper.contains(<Error message="An error occurred" />)).toBeTruthy();
  });
  it('should show input validation errors', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/edit-item']}>
        <MockedProvider mocks={editItemMocks} addTypename={false}>
          <EditItem {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
      wrapper.update();
    });
    wrapper = wrapper.find('EditItem');
    instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleSubmit');
    wrapper.find('[name="itemName"]').simulate('change', { target: { name: 'itemName', value: '' } });
    wrapper.find('[name="location"]').simulate('change', { target: { name: 'location', value: '' } });
    wrapper.find('[name="description"]').simulate('change', {
      target: { name: 'description', value: '' },
    });
    wrapper.find('form').simulate('submit');
    await act(async () => {
      await wait();
      wrapper.update();
    });
    instance = wrapper.instance();

    expect(spy).toHaveBeenCalled();
    expect(instance.state.formErrors.itemName).toBe('Item name is required');
    expect(instance.state.formErrors.description).toBe('Description is required');
    expect(instance.state.formErrors.location).toBe('Location is required');
  });
  it('should show error if upload fails', async () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    apolloClient.query.mockImplementation(() => Promise.resolve(sigResponse));
    global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost:5000/9a9a3978-84bf-42df-b4b4-b0a8be5e4d77');
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
    wrapper = mount(
      <MemoryRouter initialEntries={['/add-item']}>
        <Provider store={store}>
          <MockedProvider mocks={editItemMocks} addTypename={false}>
            <ConnectedEditItem {...props} />
          </MockedProvider>
        </Provider>
      </MemoryRouter>,
    );
    instance = wrapper.find('EditItem').instance();
    const spy = jest.spyOn(instance, 'handleSubmit');

    await act(async () => {
      await wait();
      wrapper.update();
    });

    wrapper.find('[name="itemName"]').simulate('change', { target: { name: 'itemName', value: 'New item' } });
    wrapper.find('[name="location"]').simulate('change', { target: { name: 'location', value: 'Benue' } });
    wrapper.find('[name="description"]')
      .simulate('change', { target: { name: 'description', value: 'Nice item' } });
    wrapper.find('[name="quantity"]').simulate('change', { target: { name: 'quantity', value: 2 } });
    wrapper.find('[name="value"]').simulate('change', { target: { name: 'value', value: 200000 } });
    wrapper.find('[name="file"]').simulate('change', { target: { name: 'file', files: [file] } });
    instance.state.file = 'C:\\fakepath\\chucknorris.png';
    wrapper.find('form').simulate('submit');

    await act(async () => {
      await wait();
      wrapper.update();
    });

    instance = wrapper.find('EditItem').instance();
    expect(spy).toHaveBeenCalled();
    expect(instance.state.uploadStatus).toBe('Failure');
  });
  it('should show error on submit', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/edit-item']}>
        <MockedProvider mocks={editItemSubmitErrorMocks} addTypename={false}>
          <EditItem {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    expect(wrapper.contains(<Loader />)).toBeTruthy();
    await act(async () => {
      await wait();
      wrapper.update();
    });
    wrapper.find('form').simulate('submit');
    await act(async () => {
      await wait();
      wrapper.update();
    });
  });
});
