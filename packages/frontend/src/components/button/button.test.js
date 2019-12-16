import React from 'react';
import { mount } from 'enzyme';

import Button from './button';

describe('App', () => {
  const props = {
    type: 'round',
    label: 'Submit',
  };
  const wrapper = mount(<Button {...props} />);
  const button = wrapper.find(Button);

  it('should have a btn component with Submit label', () => {
    expect(button.text()).toBe('Submit');
    expect(button).toHaveLength(1);
  });
});
