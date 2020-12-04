import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import PrivateRoute from './privateRoute';

const mockStore = configureStore([]);

describe('56730186', () => {
  it('should render component if user has been authenticated', () => {
    const userObj = {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
    };
    localStorage.setItem('user', JSON.stringify(userObj));
    const AComponent = () => <div>AComponent</div>;
    const props = { component: AComponent, path: '/dashboard' };
    const store = mockStore({
      global: {
        currentUser: { id: 1 },
      },
    });
    const wrapper = mount(
      <MemoryRouter initialEntries={[props.path]}>
        <Provider store={store}>
          <PrivateRoute {...props} />
        </Provider>
      </MemoryRouter>,
    );
    expect(wrapper.exists(AComponent)).toBe(true);
  });
  it('should redirect if user is not authenticated', () => {
    localStorage.clear();
    const AComponent = () => <div>AComponent</div>;
    const props = { component: AComponent, isAuthenticated: false, path: '/dashboard' };
    const wrapper = mount(
      <MemoryRouter initialEntries={[props.path]}>
        <PrivateRoute {...props} />
      </MemoryRouter>,
    );
    const history = wrapper.find('Router').prop('history');
    expect(history.location.pathname).toBe('/login');
  });
});
