import React from 'react';
import { mount } from 'enzyme';
import App from './app';

describe('App component', () => {
  it('Should render correctly', () => {
    const wrapper = mount(<App />);
    const navbar = wrapper.find('.navbar');

    expect(navbar).toBeDefined();
  });
});
