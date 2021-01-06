import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import authActions from './auth';
import { testToken } from '../../../__mocks__/graphqlMocks';

let mutation = jest.fn();
let expectedActions;
let store;
let email;
let password;
let firstName;
let lastName;
const mockStore = configureMockStore([thunk]);
const history = {
  push: jest.fn(),
};

describe('login action creators', () => {
  let loginActionParams;
  email = 'john.doe@example.com';
  password = 'somePassword';
  beforeEach(() => {
    mutation.mockReset();
    const initialState = {
      loggedIn: false,
      loggingIn: false,
      error: [],
      currentUser: {},
    };
    store = mockStore(initialState);
  });
  it('should dispatch login success', async () => {
    mutation = jest.fn().mockImplementation(() => new Promise((resolve) => resolve({
      loading: false,
      error: null,
      data: {
        signIn: {
          token: testToken,
          user: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      },
    })));
    loginActionParams = {
      loginMutation: mutation, email, password, history,
    };
    expectedActions = [
      { type: 'LOGIN_REQUEST', loggingIn: true },
      { type: 'LOGIN_SUCCESS', loggedIn: true, currentUser: { firstName: 'John', lastName: 'Doe', token: testToken } },
    ];
    await store.dispatch(authActions.login(loginActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should dispatch login fail if token is not returned', async () => {
    mutation = jest.fn()
      .mockImplementation(() => new Promise((resolve) => resolve({
        loading: false,
        error: null,
        data: {
          signIn: {
          },
        },
      })));
    loginActionParams = {
      loginMutation: mutation, email, password, history,
    };
    expectedActions = [
      { type: 'LOGIN_REQUEST', loggingIn: true },
      { type: 'LOGIN_FAILURE', error: ['Login failed. Please try again.'] },
    ];
    await store.dispatch(authActions.login(loginActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should dispatch login fail if token is not saved', async () => {
    const repeat = (str, x) => new Array(x + 1).join(str);
    const token = repeat('x', (1000 * 500 * 1000) / 2); // each JS character is 2 bytes
    mutation = jest.fn()
      .mockImplementation(() => new Promise((resolve) => resolve({
        loading: false,
        error: null,
        data: {
          signIn: {
            token,
          },
        },
      })));
    loginActionParams = {
      loginMutation: mutation, email, password, history,
    };
    expectedActions = [
      { type: 'LOGIN_REQUEST', loggingIn: true },
      { type: 'LOGIN_FAILURE', error: ['Login failed. Please try again.'] },
    ];
    await store.dispatch(authActions.login(loginActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should dispatch login fail on mutation fail', async () => {
    mutation.mockImplementation(() => {
      throw new Error();
    });
    loginActionParams = {
      loginMutation: mutation, email, password, history,
    };
    expectedActions = [
      { type: 'LOGIN_REQUEST', loggingIn: true },
      { type: 'LOGIN_FAILURE', error: ['Login failed. Please try again.'] },
    ];
    await store.dispatch(authActions.login(loginActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('signup action creators', () => {
  let signupActionParams;
  const userName = 'xianDoe';
  firstName = 'Xian';
  lastName = 'Doe';
  email = 'xia.doe@example.com';
  password = '!Example_pword';
  beforeEach(() => {
    mutation.mockReset();
    const initialState = {
      registering: false,
      error: [],
    };
    store = mockStore(initialState);
  });
  it('should dispatch signup success', async () => {
    mutation = jest.fn()
      .mockImplementation(() => new Promise((resolve) => resolve({
        registering: false,
        error: null,
        data: {
          signUp: {
            token: testToken,
            user: {
              firstName: 'Xian',
              lastName: 'Doe',
            },
          },
        },
      })));
    expectedActions = [
      { type: 'REGISTER_REQUEST', registering: true },
      { type: 'REGISTER_SUCCESS', registering: false, user: { firstName: 'Xian', lastName: 'Doe' } },
    ];
    signupActionParams = {
      signupMutation: mutation, email, firstName, lastName, password, userName, history,
    };
    await store.dispatch(authActions.signup(signupActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should dispatch sign up fail if token is not returned', async () => {
    mutation = jest.fn()
      .mockImplementation(() => new Promise((resolve) => resolve({
        registering: false,
        error: null,
        data: {
          signUp: {
          },
        },
      })));
    expectedActions = [
      { type: 'REGISTER_REQUEST', registering: true },
      { type: 'REGISTER_FAILURE', error: ['Registration failed. Please try again.'] },
    ];
    signupActionParams = {
      signupMutation: mutation, email, firstName, lastName, password, userName, history,
    };
    await store.dispatch(authActions.signup(signupActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should dispatch signup fail on mutation fail', async () => {
    mutation.mockImplementation(() => {
      throw new Error();
    });
    signupActionParams = {
      signupMutation: mutation, email, firstName, lastName, password, userName, history,
    };
    expectedActions = [
      { type: 'REGISTER_REQUEST', registering: true },
      { type: 'REGISTER_FAILURE', error: ['Registration failed. Please try again.'] },
    ];
    await store.dispatch(authActions.signup(signupActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
