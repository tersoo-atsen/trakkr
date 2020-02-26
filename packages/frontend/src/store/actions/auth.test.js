import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import authActions from './auth';

const mockStore = configureMockStore([thunk]);

describe('authentication action creators', () => {
  let email;
  let password;
  let history;
  let expectedActions;
  let store;
  let loginMutation = jest.fn();
  let loginActionParams;

  beforeEach(() => {
    loginMutation.mockReset();
    email = 'tersoo.atsen@outlook.com';
    password = 'somePassword';
    history = {
      push: jest.fn(),
    };

    const initialState = {
      loggedIn: false,
      loggingIn: false,
      error: [],
      user: {},
    };

    store = mockStore(initialState);
  });

  it('should dispatch login success', async () => {
    loginMutation = jest.fn()
      .mockImplementation(() => new Promise((resolve) => resolve({
        loading: false,
        error: null,
        data: {
          signIn: {
            token: 'token',
            user: {
              firstName: 'John',
              lastName: 'Doe',
            },
          },
        },
      })));
    loginActionParams = {
      loginMutation, email, password, history,
    };
    expectedActions = [
      { type: 'LOGIN_REQUEST', loggingIn: true },
      { type: 'LOGIN_SUCCESS', loggedIn: true, user: { firstName: 'John', lastName: 'Doe' } },
    ];

    await store.dispatch(authActions.login(loginActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch login fail if token is not returned', async () => {
    loginMutation = jest.fn()
      .mockImplementation(() => new Promise((resolve) => resolve({
        loading: false,
        error: null,
        data: {
          signIn: {
          },
        },
      })));
    loginActionParams = {
      loginMutation, email, password, history,
    };
    expectedActions = [
      { type: 'LOGIN_REQUEST', loggingIn: true },
      { type: 'LOGIN_FAIL', error: ['Login failed. Please try again.'] },
    ];

    await store.dispatch(authActions.login(loginActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch login fail if token is not saved', async () => {
    const repeat = (str, x) => new Array(x + 1).join(str);
    const token = repeat('x', (12 * 1024 * 1024) / 2); // each JS character is 2 bytes
    loginMutation = jest.fn()
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
      loginMutation, email, password, history,
    };
    expectedActions = [
      { type: 'LOGIN_REQUEST', loggingIn: true },
      { type: 'LOGIN_FAIL', error: ['Login failed. Please try again.'] },
    ];

    await store.dispatch(authActions.login(loginActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch login fail on mutation fail', async () => {
    loginMutation.mockImplementation(() => {
      throw new Error();
    });
    loginActionParams = {
      loginMutation, email, password, history,
    };
    expectedActions = [
      { type: 'LOGIN_REQUEST', loggingIn: true },
      { type: 'LOGIN_FAIL', error: ['Login failed. Please try again.'] },
    ];
    await store.dispatch(authActions.login(loginActionParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
