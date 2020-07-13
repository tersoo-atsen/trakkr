import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import PrivateRoute from './privateRoute';

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
    const wrapper = mount(
      <MemoryRouter initialEntries={[props.path]}>
        <PrivateRoute {...props} />
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
