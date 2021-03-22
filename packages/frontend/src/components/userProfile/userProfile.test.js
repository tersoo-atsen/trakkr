import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import wait from 'waait';
import { act } from 'react-dom/test-utils';

import ConnectedUserProfile, { UserProfile } from './userProfile';
import Loader from '../loader';
import Error from '../error';
import apolloClient from '../../utils/apolloClient';
import {
  userProfileMocks, userProfileErrorMocks, updateUserMocks, sigResponse,
} from '../../../__mocks__/graphqlMocks';

jest.mock('../../utils/apolloClient');

const mockStore = configureStore([]);

describe('UserProfile component', () => {
  let wrapper;
  let statefulWrapper;
  let instance;
  const props = {
    dispatch: jest.fn(),
    currentUser: {
      id: 1, firstName: 'John', lastName: 'Doe', avatarUrl: 'trakkr/john-doe',
    },
  };

  beforeEach(async () => {
    const store = mockStore({
      global: {
        currentUser: {
          id: 1, firstName: 'John', lastName: 'Doe', avatarUrl: 'trakkr/john-doe',
        },
      },
    });
    store.dispatch = jest.fn();
    wrapper = mount(
      <MemoryRouter initialEntries={['/profile']}>
        <MockedProvider mocks={[userProfileMocks, updateUserMocks]} addTypename={false}>
          <UserProfile {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    statefulWrapper = mount(
      <MemoryRouter initialEntries={['/profile']}>
        <Provider store={store}>
          <MockedProvider mocks={[userProfileMocks, updateUserMocks]} addTypename={false}>
            <ConnectedUserProfile {...props} />
          </MockedProvider>
        </Provider>
      </MemoryRouter>,
    );
    instance = wrapper.find('UserProfile').instance();
  });

  it('should render user profile component', async () => {
    expect(wrapper.contains(<Loader />)).toBeTruthy();

    await act(async () => {
      await wait();
      wrapper.update();
    });

    expect(wrapper.find('.user-profile-wrapper')).toBeDefined();
    expect(wrapper.find('.profile-pic-wrapper')).toBeDefined();
    expect(wrapper.find('.edit-user-submit_submit_button').text()).toBe('Save Changes');
  });

  it('should render page load error ', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/profile']}>
        <MockedProvider mocks={[userProfileErrorMocks]} addTypename={false}>
          <UserProfile {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    await act(async () => {
      await wait();
      wrapper.update();
    });
    expect(wrapper.contains(<Error message="An error occurred" />)).toBeTruthy();
  });

  it('should display input errors if any field is empty', async () => {
    await act(async () => {
      await wait();
      wrapper.update();
    });
    expect(instance.state.firstName).toBe('John');
    expect(instance.state.lastName).toBe('Doe');
    expect(instance.state.userName).toBe('demoUser01');
    wrapper.find('[name="firstName"]').simulate('change', { target: { name: 'firstName', value: '' } });
    wrapper.find('[name="lastName"]').simulate('change', { target: { name: 'lastName', value: '' } });
    wrapper.find('[name="userName"]').simulate('change', { target: { name: 'userName', value: '' } });
    wrapper.find('form').simulate('submit');
    await act(async () => {
      await wait();
      wrapper.update();
    });
    expect(instance.state.formErrors.firstName).toBe('First name is required');
    expect(instance.state.formErrors.lastName).toBe('Last name is required');
    expect(instance.state.formErrors.userName).toBe('Username is required');
  });

  it('should update user data only', async () => {
    await act(async () => {
      await wait();
      wrapper.update();
    });
    expect(instance.state.firstName).toBe('John');
    expect(instance.state.lastName).toBe('Doe');
    expect(instance.state.userName).toBe('demoUser01');
    const spy = jest.spyOn(instance, 'handleSubmit');
    wrapper.find('[name="firstName"]').simulate('change', { target: { name: 'firstName', value: 'Jonas' } });
    wrapper.find('[name="lastName"]').simulate('change', { target: { name: 'lastName', value: 'Does' } });
    wrapper.find('[name="userName"]').simulate('change', { target: { name: 'userName', value: 'jonas-does' } });
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(instance.state.firstName).toBe('Jonas');
    expect(instance.state.lastName).toBe('Does');
    expect(instance.state.userName).toBe('jonas-does');
  });

  it('should update user data and avatar', async () => {
    await act(async () => {
      await wait();
      statefulWrapper.update();
    });
    instance = statefulWrapper.find('UserProfile').instance();
    expect(instance.state.firstName).toBe('John');
    expect(instance.state.lastName).toBe('Doe');
    expect(instance.state.userName).toBe('demoUser01');
    expect(instance.state.avatarUrl).toBe('trakkr/john-doe');
    expect(instance.state.selectedImagePath).toBe('');
    expect(instance.state.imageFile).toBe('');

    const spy = jest.spyOn(instance, 'handleSubmit');
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    apolloClient.query.mockImplementation(() => Promise.resolve(sigResponse));
    global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost:5000/9a9a3978-84bf-42df-b4b4-b0a8be5e4d77');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(),
    }));

    statefulWrapper.find('[name="firstName"]').simulate('change', { target: { name: 'firstName', value: 'Jonas' } });
    statefulWrapper.find('[name="lastName"]').simulate('change', { target: { name: 'lastName', value: 'Does' } });
    statefulWrapper.find('[name="userName"]').simulate('change', { target: { name: 'userName', value: 'jonas-does' } });
    statefulWrapper.find('[name="file"]').simulate('change', { target: { name: 'file', files: [file] } });
    instance.state.file = 'C:\\fakepath\\chucknorris.png';
    statefulWrapper.find('form').simulate('submit');

    await act(async () => {
      await wait();
      statefulWrapper.update();
    });

    instance = statefulWrapper.find('UserProfile').instance();

    expect(spy).toHaveBeenCalled();
    expect(instance.state.firstName).toBe('Jonas');
    expect(instance.state.lastName).toBe('Does');
    expect(instance.state.userName).toBe('jonas-does');
    expect(instance.state.selectedImagePath).toBe('blob:http://localhost:5000/9a9a3978-84bf-42df-b4b4-b0a8be5e4d77');
    expect(instance.state.imageFile).toBe(file);
  });

  it('should show error if upload fails', async () => {
    apolloClient.query.mockImplementation(() => Promise.resolve(sigResponse));
    global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost:5000/9a9a3978-84bf-42df-b4b4-b0a8be5e4d77');
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));

    await act(async () => {
      await wait();
      wrapper.update();
    });
    expect(instance.state.firstName).toBe('John');
    expect(instance.state.lastName).toBe('Doe');
    expect(instance.state.userName).toBe('demoUser01');
    expect(instance.state.avatarUrl).toBe('trakkr/john-doe');
    expect(instance.state.selectedImagePath).toBe('');
    expect(instance.state.imageFile).toBe('');

    const spy = jest.spyOn(instance, 'handleSubmit');
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    wrapper.find('[name="firstName"]').simulate('change', { target: { name: 'firstName', value: 'Jonas' } });
    wrapper.find('[name="lastName"]').simulate('change', { target: { name: 'lastName', value: 'Does' } });
    wrapper.find('[name="userName"]').simulate('change', { target: { name: 'userName', value: 'jonas-does' } });
    wrapper.find('[name="file"]').simulate('change', { target: { name: 'file', files: [file] } });
    instance.state.file = 'C:\\fakepath\\chucknorris.png';
    wrapper.find('form').simulate('submit');
    await act(async () => {
      await wait();
      wrapper.update();
    });
    expect(spy).toHaveBeenCalled();
    expect(instance.state.uploadStatus).toBe('Failure');
  });
});
