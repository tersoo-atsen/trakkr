import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import LandingPage from './landingPage';
import Button from '../button';

const mockStore = configureStore([]);

describe('Landing page component', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({
      global: {
        loggingIn: false,
        loggedIn: false,
        error: [],
        user: {},
      },
    });
    wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <LandingPage />
        </Provider>
      </MemoryRouter>,
    );
  });

  it('Should render correctly', () => {
    const navbar = wrapper.find('nav');
    const buttons = wrapper.find(Button);

    expect(navbar).toBeDefined();
    expect(buttons).toHaveLength(2);
    expect(wrapper.find(LandingPage).length).toBe(1);
  });
});
