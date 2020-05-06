import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './app';
import LandingPage from '../landingPage';
import NotFoundPage from '../notFoundPage';

const mockStore = configureStore([]);

describe('App component', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({
      global: {
        loggingIn: false,
        loggedIn: false,
        currentUser: {},
        error: [],
      },
    });
    wrapper = mount(
      <MockedProvider>
        <MemoryRouter initialEntries={['/']}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      </MockedProvider>,
    );
  });

  it('Should render correctly', () => {
    const navbar = wrapper.find('.navbar');

    expect(navbar).toBeDefined();
    expect(wrapper.find(LandingPage).length).toBe(1);
    expect(wrapper.find(NotFoundPage).length).toBe(0);
  });

  it('Should render 404 page if component is not found', () => {
    wrapper = mount(
      <MockedProvider>
        <MemoryRouter initialEntries={['/test']}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(wrapper.find(LandingPage).length).toBe(0);
    expect(wrapper.find(NotFoundPage).length).toBe(1);
  });
});
