import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import wait from 'waait';
import { act } from 'react-dom/test-utils';

import ConnectedLogin, { Login } from './login';
import { login as loginMocks, loginErrorMocks } from '../../../__mocks__/graphqlMocks';

const mockStore = configureStore([]);

describe('Login component', () => {
  let wrapper;
  let component;
  let instance;
  let props;
  let store;

  beforeEach(() => {
    store = mockStore({
      global: {
        loggingIn: false,
        loggedIn: false,
        error: [],
        currentUser: {},
      },
    });
    store.dispatch = jest.fn();
    props = {
      history: {
        push: jest.fn(),
      },
      dispatch: jest.fn(),
      loading: false,
    };
    wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <MockedProvider mocks={[loginMocks]} addTypename={false}>
          <Login {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
    instance = wrapper.find('Login').instance();
  });
  it('should render login component', () => {
    expect(wrapper.find('.login_page')).toBeDefined();
    expect(wrapper.find('button.button.login_form_submit_button').text()).toBe('Sign in');
  });
  it('should login user with correct credentials', () => {
    const spy = jest.spyOn(instance, 'handleSubmit');
    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'jane.doe@example.com' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'applicationUser1' } });
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(instance.state.email).toBe('jane.doe@example.com');
    expect(instance.state.password).toBe('applicationUser1');
  });
  it('should not validate input if target name is unknown', () => {
    wrapper.find('[name="password"]')
      .simulate('change', { target: { name: 'passwords', value: 'applicationUser1' } });
    expect(instance.state.password).toBe('');
  });
  it('should show error if email is invalid', () => {
    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'jane.doe@example' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'applicationUser1' } });
    wrapper.find('form').simulate('submit');
    expect(instance.state.formErrors.email).toBe('Email address is invalid');
  });
  it('should show required error if email/password is not present', () => {
    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: '' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: '' } });
    wrapper.find('form').simulate('submit');
    expect(instance.state.formErrors.email).toBe('Email is required');
    expect(instance.state.formErrors.password).toBe('Password is required');
  });
  it('should show error if password is too short', () => {
    wrapper.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'jane.doe@example.com' } });
    wrapper.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'short' } });
    wrapper.find('form').simulate('submit');
    expect(instance.state.formErrors.password).toBe('Password should not less than 6 characters');
  });
  it('should not submit form with no email and password', () => {
    wrapper.find('form').simulate('submit');
    expect(instance.state.formErrors.email).toBe('Email is required');
    expect(instance.state.formErrors.password).toBe('Password is required');
  });
  it('should loading indicator', async () => {
    component = mount(
      <MemoryRouter initialEntries={['/login']}>
        <MockedProvider mocks={[]} addTypename={false}>
          <Provider store={store}>
            <ConnectedLogin {...props} />
          </Provider>
        </MockedProvider>
      </MemoryRouter>,
    );
    component.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'ters@example.com' } });
    component.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'applicationUser1' } });
    component.find('form').simulate('submit');
    // expect(wrapper.contains('.is-loading')).toBeTruthy();
  });
  it('should login user in successfully', async () => {
    component = mount(
      <MemoryRouter initialEntries={['/login']}>
        <MockedProvider mocks={[loginMocks]} addTypename={false}>
          <Provider store={store}>
            <ConnectedLogin {...props} />
          </Provider>
        </MockedProvider>
      </MemoryRouter>,
    );
    component.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'ters@example.com' } });
    component.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'applicationUser1' } });
    component.find('form').simulate('submit');
    await act(async () => {
      await wait();
    });
    component.update();
    const loginComponent = component.find('Login');
  });
  it('should show login error', async () => {
    component = mount(
      <MemoryRouter initialEntries={['/login']}>
        <MockedProvider mocks={[loginErrorMocks]} addTypename={false}>
          <Provider store={store}>
            <ConnectedLogin {...props} />
          </Provider>
        </MockedProvider>
      </MemoryRouter>,
    );
    component.find('[name="email"]').simulate('change', { target: { name: 'email', value: 'ters@example.com' } });
    component.find('[name="password"]').simulate('change', { target: { name: 'password', value: 'applicationUser1' } });
    component.find('form').simulate('submit');
    await act(async () => {
      await wait();
    });
    component.update();
  });
});
