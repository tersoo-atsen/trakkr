import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import wait from 'waait';
import { act } from 'react-dom/test-utils';

import ConnectedAddItem, { AddItem } from './addItem';
import { addItemMocks, sigResponse } from '../../../__mocks__/graphqlMocks';
import apolloClient from '../../utils/apolloClient';

jest.mock('../../utils/apolloClient');
const mockStore = configureStore([]);

describe('AddItem component', () => {
  let wrapper;
  let statefulWrapper;
  let instance;
  const props = {
    dispatch: jest.fn(),
    currentUser: { id: 1 },
    history: {
      push: jest.fn(),
    },
  };
  const store = mockStore({
    global: {
      currentUser: { id: 1 },
    },
  });
  store.dispatch = jest.fn();
  global.fetch = jest.fn();

  it('should render add item view', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/add-item']}>
        <MockedProvider mocks={addItemMocks} addTypename={false}>
          <AddItem {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    wrapper = wrapper.find('AddItem');
    expect(wrapper.find('.add-item-page_wrapper')).toBeTruthy();
  });

  it('should show input validation errors', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/add-item']}>
        <MockedProvider mocks={addItemMocks} addTypename={false}>
          <AddItem {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    wrapper = wrapper.find('AddItem');
    instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleSubmit');

    wrapper.find('[name="name"]').simulate('change', { target: { name: 'name', value: '' } });
    wrapper.find('[name="location"]').simulate('change', { target: { name: 'location', value: '' } });
    wrapper.find('[name="description"]')
      .simulate('change', { target: { name: 'description', value: '' } });
    wrapper.find('form').simulate('submit');

    await act(async () => {
      await wait();
      wrapper.update();
    });
    instance = wrapper.instance();

    expect(spy).toHaveBeenCalled();
    expect(instance.state.formErrors.name).toBe('Name is required');
    expect(instance.state.formErrors.description).toBe('Description is required');
    expect(instance.state.formErrors.location).toBe('Location is required');
  });

  it('should show error if upload fails', async () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    apolloClient.query.mockImplementation(() => Promise.resolve(sigResponse));
    global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost:5000/9a9a3978-84bf-42df-b4b4-b0a8be5e4d77');
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
    statefulWrapper = mount(
      <MemoryRouter initialEntries={['/add-item']}>
        <Provider store={store}>
          <MockedProvider mocks={addItemMocks} addTypename={false}>
            <ConnectedAddItem {...props} />
          </MockedProvider>
        </Provider>
      </MemoryRouter>,
    );
    instance = statefulWrapper.find('AddItem').instance();
    const spy = jest.spyOn(instance, 'handleSubmit');

    await act(async () => {
      await wait();
      wrapper.update();
    });

    statefulWrapper.find('[name="name"]').simulate('change', { target: { name: 'name', value: 'New item' } });
    statefulWrapper.find('[name="location"]').simulate('change', { target: { name: 'location', value: 'Benue' } });
    statefulWrapper.find('[name="description"]')
      .simulate('change', { target: { name: 'description', value: 'Nice item' } });
    statefulWrapper.find('[name="quantity"]').simulate('change', { target: { name: 'quantity', value: 2 } });
    statefulWrapper.find('[name="value"]').simulate('change', { target: { name: 'value', value: 200000 } });
    statefulWrapper.find('[name="file"]').simulate('change', { target: { name: 'file', files: [file] } });
    instance.state.file = 'C:\\fakepath\\chucknorris.png';
    statefulWrapper.find('form').simulate('submit');

    await act(async () => {
      await wait();
      wrapper.update();
    });

    instance = statefulWrapper.find('AddItem').instance();
    expect(spy).toHaveBeenCalled();
    expect(instance.state.uploadStatus).toBe('Failure');
  });

  it('should create new item', async () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    statefulWrapper = mount(
      <MemoryRouter initialEntries={['/add-item']}>
        <Provider store={store}>
          <MockedProvider mocks={addItemMocks} addTypename={false}>
            <ConnectedAddItem {...props} />
          </MockedProvider>
        </Provider>
      </MemoryRouter>,
    );

    instance = statefulWrapper.find('AddItem').instance();
    const spy = jest.spyOn(instance, 'handleSubmit');
    apolloClient.query.mockImplementation(() => Promise.resolve(sigResponse));
    global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost:5000/9a9a3978-84bf-42df-b4b4-b0a8be5e4d77');
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(),
    // }));
    global.fetch.mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(),
    }));

    statefulWrapper.find('[name="name"]').simulate('change', { target: { name: 'name', value: 'New item' } });
    statefulWrapper.find('[name="location"]').simulate('change', { target: { name: 'location', value: 'Benue' } });
    statefulWrapper.find('[name="description"]')
      .simulate('change', { target: { name: 'description', value: 'Nice item' } });
    statefulWrapper.find('[name="quantity"]').simulate('change', { target: { name: 'quantity', value: 2 } });
    statefulWrapper.find('[name="value"]').simulate('change', { target: { name: 'value', value: 200000 } });
    statefulWrapper.find('[name="file"]').simulate('change', { target: { name: 'file', files: [file] } });
    instance.state.file = 'C:\\fakepath\\chucknorris.png';
    statefulWrapper.find('form').simulate('submit');

    await act(async () => {
      await wait();
      statefulWrapper.update();
    });
    instance = statefulWrapper.instance();
    expect(spy).toHaveBeenCalled();
  });
});
