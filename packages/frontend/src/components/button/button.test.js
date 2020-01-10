import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Button from './button';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      type: 'round',
      label: 'Submit',
      path: '/',
    };
    wrapper = mount(
      <MemoryRouter>
        <Button {...props} />
      </MemoryRouter>,
    );
  });

  it('should have a btn component with Submit label', () => {
    const button = wrapper.find(Button);
    expect(button.text()).toBe('Submit');
    expect(button).toHaveLength(1);
  });
});
