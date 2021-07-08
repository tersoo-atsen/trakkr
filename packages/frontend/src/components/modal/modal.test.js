import React from 'react';
import { mount } from 'enzyme';

import Modal from './modal';

describe('Modal component', () => {
  it('should render the modal component', () => {
    const props = {
      closeModal: jest.fn,
      handleDelete: jest.fn,
    };
    const wrapper = mount(<Modal {...props} />);

    expect(wrapper.find('.lead-text')).toBeDefined();
  });
});
