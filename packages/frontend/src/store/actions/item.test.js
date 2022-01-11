import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { addItem, editItem } from './item';
import { itemConstants } from '../constants';

let mutation = jest.fn();
let expectedActions;
let store;
let name;
let location;
let description;
let value;
let quantity;
let imageUrl;

const mockStore = configureMockStore([thunk]);

describe('Create item action creators', () => {
  name = 'Gold statue';
  location = 'Makurdi';
  description = 'Precious Item';
  value = 120000;
  quantity = 1;
  imageUrl = 'path/to/image';

  beforeEach(() => {
    mutation.mockReset();
    const initialState = { error: [] };
    store = mockStore(initialState);
  });

  it('should dispatch item creation success', async () => {
    mutation = jest.fn().mockImplementation(
      () => new Promise((resolve) => resolve({
        registering: false,
        error: null,
        data: {
          createItem: {
            id: 1,
            name,
            description,
            value,
            quantity,
          },
        },
      })),
    );

    const addItemParams = {
      addItemMutation: mutation,
      name,
      location,
      description,
      value,
      quantity,
      imageUrl,
      history: {
        push: jest.fn(),
      },
    };
    expectedActions = [
      { type: itemConstants.ADD_ITEM_REQUEST },
      { type: itemConstants.ADD_ITEM_SUCCESS },
    ];
    await store.dispatch(addItem(addItemParams));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch item creation failure', async () => {
    mutation = jest.fn().mockImplementation(() => {
      throw new Error('Error');
    });

    const addItemParams = {
      addItemMutation: mutation,
      name,
      location,
      description,
      value,
      quantity,
      imageUrl,
    };
    expectedActions = [
      { type: itemConstants.ADD_ITEM_REQUEST },
      {
        type: itemConstants.ADD_ITEM_FAILURE,
        error: ['Item creation failed. Please try again.'],
      },
    ];
    await store.dispatch(addItem(addItemParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
describe('Update item action creators', () => {
  name = 'Gold statue';
  location = 'Makurdi';
  description = 'Precious Item';
  value = 120000;
  quantity = 1;
  imageUrl = 'path/to/image';

  beforeEach(() => {
    mutation.mockReset();
    const initialState = { error: [] };
    store = mockStore(initialState);
  });
  it('should dispatch item update success', async () => {
    mutation = jest.fn().mockImplementation(
      () => new Promise((resolve) => resolve({
        registering: false,
        error: null,
        data: {
          updateItem: {
            id: 30,
            name,
            description,
            value,
            quantity,
          },
        },
      })),
    );
    const editItemParams = {
      editItemMutation: mutation,
      name,
      location,
      description,
      value,
      quantity,
      imageUrl,
      history: {
        push: jest.fn(),
      },
    };
    expectedActions = [
      { type: itemConstants.UPDATE_ITEM_REQUEST },
      { type: itemConstants.UPDATE_ITEM_SUCCESS },
    ];
    await store.dispatch(editItem(editItemParams));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch item update failure', async () => {
    mutation = jest.fn().mockImplementation(() => {
      throw new Error('Error');
    });
    const editItemParams = {
      editItemMutation: mutation,
      name,
      location,
      description,
      value,
      quantity,
      imageUrl,
      history: {
        push: jest.fn(),
      },
    };
    expectedActions = [
      { type: itemConstants.UPDATE_ITEM_REQUEST },
      {
        type: itemConstants.UPDATE_ITEM_FAILURE,
        error: ['Item update failed. Please try again.'],
      },
    ];
    await store.dispatch(editItem(editItemParams));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
