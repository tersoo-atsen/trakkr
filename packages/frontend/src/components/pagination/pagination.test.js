import { mount } from 'enzyme';
import React from 'react';

import Pagination from './pagination';

describe('Pagination Component', () => {
  let wrapper;
  let props = {
    totalPages: 2,
    currentPage: 1,
    hasNext: true,
    hasPrevious: false,
    handleData: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<Pagination {...props} />);
  });

  it('should render Pagination component', () => {
    expect(wrapper.find('.page-number').length).toBe(2);
    expect(wrapper.find('.previous-arrow').length).toBe(1);
    expect(wrapper.find('.next-arrow').length).toBe(1);
    expect(wrapper.find('.button').length).toBe(2);
    expect(wrapper.find('.pagination-wrapper')).toBeTruthy();
    expect(wrapper.find('#next-button').props().disabled).toBe(false);
    expect(wrapper.find('#previous-button').props().disabled).toBe(true);
  });
  it('should render second page when next is clicked', () => {
    const nextButton = wrapper.find('#next-button');
    nextButton.simulate('click');
    wrapper.setProps({ currentPage: 2, hasNext: false, hasPrevious: true });
    wrapper.update();
    const nextButtonAfter = wrapper.find('#next-button');
    const previousButtonAfter = wrapper.find('#previous-button');
    expect(nextButtonAfter.props().disabled).toBe(true);
    expect(previousButtonAfter.props().disabled).toBe(false);
    expect(wrapper.find('.active').props().tabIndex).toBe(2);
  });
  it('should render second page when page 2 button is clicked', () => {
    const pageTwoButton = wrapper.find('[tabIndex=2]');
    pageTwoButton.simulate('click');
    wrapper.setProps({ currentPage: 2, hasNext: false, hasPrevious: true });
    wrapper.update();
    const nextButtonAfter = wrapper.find('#next-button');
    const previousButtonAfter = wrapper.find('#previous-button');
    expect(nextButtonAfter.props().disabled).toBe(true);
    expect(previousButtonAfter.props().disabled).toBe(false);
    expect(wrapper.find('.active').props().tabIndex).toBe(2);
  });
  it('should go back to first page when pevious button is clicked', () => {
    props = {
      totalPages: 2,
      currentPage: 2,
      hasNext: false,
      hasPrevious: true,
      handleData: jest.fn(),
    };
    wrapper = mount(<Pagination {...props} />);
    const previousButton = wrapper.find('#previous-button');
    previousButton.simulate('click');
    wrapper.setProps({ currentPage: 1, hasNext: true, hasPrevious: false });
    wrapper.update();
    const nextButtonAfter = wrapper.find('#next-button');
    const previousButtonAfter = wrapper.find('#previous-button');
    expect(nextButtonAfter.props().disabled).toBe(false);
    expect(previousButtonAfter.props().disabled).toBe(true);
    expect(wrapper.find('.active').props().tabIndex).toBe(1);
  });
  it('should not change page if current page is greater than total pages', () => {
    props = {
      ...props,
      currentPage: 10,
      hasNext: true,
    };
    wrapper = mount(<Pagination {...props} />);
    const nextButton = wrapper.find('#next-button');
    nextButton.simulate('click');
  });
  it('should not change page if current page is less than 1', () => {
    props = {
      ...props,
      currentPage: 0,
      hasPrevious: true,
    };
    wrapper = mount(<Pagination {...props} />);
    const previousButton = wrapper.find('#previous-button');
    previousButton.simulate('click');
  });
});
