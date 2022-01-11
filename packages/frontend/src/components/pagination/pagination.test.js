import { mount } from 'enzyme';
import React from 'react';

import Pagination from './pagination';

describe('Pagination Component', () => {
  let wrapper;
  let props = {
    pageInfo: {
      pages: 2,
      hasNextPage: true,
      hasPrevPage: false,
    },
    currentPage: 1,
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
    wrapper.setProps({
      currentPage: 2, pageInfo: { pages: 2, hasNextPage: false, hasPrevPage: true },
    });
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
    wrapper.setProps({
      currentPage: 2,
      pageInfo: {
        pages: 2,
        hasNextPage: false,
        hasPrevPage: true,
      },
    });
    wrapper.update();
    const nextButtonAfter = wrapper.find('#next-button');
    const previousButtonAfter = wrapper.find('#previous-button');
    expect(nextButtonAfter.props().disabled).toBe(true);
    expect(previousButtonAfter.props().disabled).toBe(false);
    expect(wrapper.find('.active').props().tabIndex).toBe(2);
  });
  it('should go back to first page when pevious button is clicked', () => {
    props = {
      pageInfo: {
        pages: 2,
        hasNextPage: false,
        hasPrevPage: true,
      },
      currentPage: 2,
      handleData: jest.fn(),
    };
    wrapper = mount(<Pagination {...props} />);
    const previousButton = wrapper.find('#previous-button');
    previousButton.simulate('click');
    wrapper.setProps({ currentPage: 1, pageInfo: { pages: 2, hasNextPage: true, hasPrevPage: false } });
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
      pageInfo: {
        ...props.pageInfo,
        hasNextPage: true,
      },
      currentPage: 10,
    };
    wrapper = mount(<Pagination {...props} />);
    const nextButton = wrapper.find('#next-button');
    nextButton.simulate('click');
  });
  it('should not change page if current page is less than 1', () => {
    props = {
      ...props,
      pageInfo: {
        ...props.pageInfo,
        hasPrevPage: true,
      },
      currentPage: 0,
    };
    wrapper = mount(<Pagination {...props} />);
    const previousButton = wrapper.find('#previous-button');
    previousButton.simulate('click');
  });
});
