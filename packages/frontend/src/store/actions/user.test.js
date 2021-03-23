import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { updateUserInfo } from './user';
import { userConstants } from '../constants';

let mutation = jest.fn();
let expectedActions;
let store;
let firstName;
let lastName;
let userName;
let avatarUrl;
let updateUserParams;
const mockStore = configureMockStore([thunk]);
const user = {
  id: 1,
  avatarUrl: 'trakr/john-doe',
  firstName: 'John',
  lastName: 'Doe',
  userName: 'john-doe',
};

describe('user action creators', () => {
  firstName = 'John';
  lastName = 'Doe';
  userName = 'john-doe';
  avatarUrl = 'trakr/john-doe';
  beforeEach(() => {
    mutation.mockReset();
    const initialState = {
      error: [],
    };
    store = mockStore(initialState);
  });

  it('should dispatch user update success', async () => {
    mutation = jest.fn().mockImplementation(() => new Promise((resolve) => resolve({
      registering: false,
      error: null,
      data: {
        updateUser: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          userName: 'john-doe',
          avatarUrl: 'trakr/john-doe',
        },
      },
    })));
    updateUserParams = {
      updateUserMutation: mutation, firstName, lastName, avatarUrl, userName,
    };
    expectedActions = [
      { type: userConstants.UPDATE_USER_REQUEST },
      { type: userConstants.UPDATE_USER_SUCCESS, user },
    ];
    await store.dispatch(updateUserInfo(updateUserParams));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch user update failure', async () => {
    mutation = jest.fn().mockImplementation(() => {
      throw new Error('Error');
    });
    updateUserParams = {
      updateUserMutation: mutation, firstName, lastName, avatarUrl, userName,
    };
    expectedActions = [
      { type: userConstants.UPDATE_USER_REQUEST },
      { type: userConstants.UPDATE_USER_FAILURE, error: ['User update failed. Please try again.'] },
    ];
    await store.dispatch(updateUserInfo(updateUserParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
