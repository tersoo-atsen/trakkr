import React from 'react';
import { mount } from 'enzyme';
import { Link, MemoryRouter } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';

describe('Not Found Page Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
  });

  it('Renders the component correctly', () => {
    expect(wrapper.find('.not-found').length).toBe(1);
    expect(wrapper.find('.not-found__text-wrapper').length).toBe(1);
    expect(wrapper.find('.not-found__title-text').length).toBe(1);
    expect(wrapper.find('.not-found__sub-title-text').length).toBe(1);
    expect(wrapper.find('.not-found__desc-text').length).toBe(1);
    expect(wrapper.find(Link).props().to).toBe('/');
  });
});
