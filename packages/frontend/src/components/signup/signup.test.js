import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { GraphQLError } from 'graphql';
import wait from 'waait';

import ConnectedSignup, { Signup } from './signup';
import { USER_SIGNUP } from '../../graphql/mutations';
import { signup } from '../../../__mocks__/graphqlMocks';

const mockStore = configureStore([]);

describe('Signup component', () => {
  let wrapper;
  let component;
  let instance;
  let signupMocks = signup;
  let props;
  let store;
  beforeEach(() => {
    store = mockStore({
      register: {
        registering: false,
        user: {},
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
      <MemoryRouter initialEntries={['/signup']}>
        <MockedProvider mocks={[signupMocks]} addTypename={false}>
          <Signup {...props} />
        </MockedProvider>
      </MemoryRouter>,
    );
  });
  it('should render signup component', () => {
    expect(wrapper.find('.signup_page')).toBeDefined();
    expect(wrapper.find('button.button.signup_form_submit_button').text()).toBe('Submit');
  });
  it('should register user with correct credentials', () => {
    instance = wrapper.find('Signup').instance();
    const spy = jest.spyOn(instance, 'handleSubmit');
    wrapper.find('[name="email"]')
      .simulate('change', { target: { name: 'email', value: 'xian.doe@example.com' } });
    wrapper.find('[name="firstName"]')
      .simulate('change', { target: { name: 'firstName', value: 'Xian' } });
    wrapper.find('[name="lastName"]')
      .simulate('change', { target: { name: 'lastName', value: 'Doe' } });
    wrapper.find('[name="password"]')
      .simulate('change', { target: { name: 'password', value: 'DemoUser1' } });
    wrapper.find('[name="confirmPassword"]')
      .simulate('change', { target: { name: 'confirmPassword', value: 'DemoUser1' } });
    wrapper.find('form').simulate('submit');
    instance = wrapper.find('Signup').instance();
    expect(spy).toHaveBeenCalled();
    expect(instance.state.firstName).toBe('Xian');
    expect(instance.state.lastName).toBe('Doe');
    expect(instance.state.email).toBe('xian.doe@example.com');
    expect(instance.state.password).toBe('DemoUser1');
  });
  it('should not sibmit invalid form', () => {
    wrapper.find('[name="email"]')
      .simulate('change', { target: { name: 'email', value: '' } });
    wrapper.find('[name="firstName"]')
      .simulate('change', { target: { name: 'firstName', value: '' } });
    wrapper.find('[name="lastName"]')
      .simulate('change', { target: { name: 'lastName', value: '' } });
    wrapper.find('[name="password"]')
      .simulate('change', { target: { name: 'password', value: '' } });
    wrapper.find('[name="confirmPassword"]')
      .simulate('change', { target: { name: 'confirmPassword', value: '' } });
    wrapper.find('form').simulate('submit');
    instance = wrapper.find('Signup').instance();
    expect(instance.state.formErrors.email).toBe('Email is required');
    expect(instance.state.formErrors.firstName).toBe('First name is required');
    expect(instance.state.formErrors.lastName).toBe('Last name is required');
    expect(instance.state.formErrors.password).toBe('Password is required');
    expect(instance.state.formErrors.confirmPassword).toBe('Password confirmation is required');
  });
  it('should show errors if form inputs are not valid', () => {
    wrapper.find('[name="email"]')
      .simulate('change', { target: { name: 'email', value: 'jane.doe@example' } });
    wrapper.find('[name="password"]')
      .simulate('change', { target: { name: 'password', value: 'short' } });
    wrapper.find('[name="firstName"]')
      .simulate('change', { target: { name: 'firstName', value: 'Xi' } });
    wrapper.find('[name="lastName"]')
      .simulate('change', { target: { name: 'lastName', value: 'Da' } });
    wrapper.find('[name="confirmPassword"]')
      .simulate('change', { target: { name: 'confirmPassword', value: 'short' } });
    wrapper.find('form').simulate('submit');
    instance = wrapper.find('Signup').instance();
    expect(instance.state.formErrors.password).toBe('Password should be greater than 6 characters');
    expect(instance.state.formErrors.firstName).toBe('First name should be 3 characters or more');
    expect(instance.state.formErrors.lastName).toBe('Last name should not less than 3 characters');
    expect(instance.state.formErrors.email).toBe('Email address is invalid');
  });
  it('should show error if password confirmation is not valid', () => {
    wrapper.find('[name="email"]')
      .simulate('change', { target: { name: 'email', value: 'xian.doe@example.com' } });
    wrapper.find('[name="firstName"]')
      .simulate('change', { target: { name: 'firstName', value: 'Xian' } });
    wrapper.find('[name="lastName"]')
      .simulate('change', { target: { name: 'lastName', value: 'Doe' } });
    wrapper.find('[name="password"]')
      .simulate('change', { target: { name: 'password', value: 'DemoUser1' } });
    wrapper.find('[name="confirmPassword"]')
      .simulate('change', { target: { name: 'confirmPassword', value: 'DemoUser122' } });
    wrapper.find('form').simulate('submit');
    instance = wrapper.find('Signup').instance();
    expect(instance.state.formErrors.confirmPassword).toBe('Password and confirmation do not match');
  });
  it('should not submit form with no email and password', () => {
    wrapper.find('[name="email"]')
      .simulate('change', { target: { name: 'email', value: '' } });
    wrapper.find('[name="password"]')
      .simulate('change', { target: { name: 'password', value: '' } });
    wrapper.find('form').simulate('submit');
    instance = wrapper.find('Signup').instance();
    expect(instance.state.formErrors.email).toBe('Email is required');
    expect(instance.state.formErrors.password).toBe('Password is required');
  });
  it('should show error UI', async () => {
    signupMocks = {
      request: {
        query: USER_SIGNUP,
        variables: { email: 'jane.doe@example.com', password: 'applicationUser1' },
      },
      result: {
        errors: [new GraphQLError('forced error')],
      },
    };
    component = mount(
      <MemoryRouter initialEntries={['/signup']}>
        <MockedProvider mocks={[signupMocks]} addTypename={false}>
          <Provider store={store}>
            <ConnectedSignup {...props} />
          </Provider>
        </MockedProvider>
      </MemoryRouter>,
    );
    component.find('[name="email"]')
      .simulate('change', { target: { name: 'email', value: 'ters@example.com' } });
    component.find('[name="firstName"]')
      .simulate('change', { target: { name: 'firstName', value: 'ters@example.com' } });
    component.find('[name="lastName"]')
      .simulate('change', { target: { name: 'lastName', value: 'ters@example.com' } });
    component.find('[name="password"]')
      .simulate('change', { target: { name: 'password', value: 'applicationUser1' } });
    component.find('form').simulate('submit');
    await wait(5); // wait for response
    component.update();
    // expect(tree.children).toContain('Error!');
  });
});
