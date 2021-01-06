import React from 'react';
import { mount } from 'enzyme';

import ImageLoader from './ImageLoader';

describe('Image loading Component', () => {
  let wrapper;
  const props = {
    classString: 'product--photo',
    hiResSource: 'hi/res/image/path',
    lowResSource: 'low/res/image/path',
    altText: 'Trakkr illustration',
  };

  beforeEach(() => {
    wrapper = mount(<ImageLoader
      {...props}
    />);
  });

  it('Render hi res and low res images', () => {
    expect(wrapper.find('.product--photo').length).toEqual(2);
  });

  it('Render only hi res image after it is loaded', () => {
    wrapper.instance().onLoadHandler();
    wrapper.update();
    expect(wrapper.find('.product--photo').length).toEqual(1);
  });
});
