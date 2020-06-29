/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';

import './dashboard.scss';
import Sidebar from '../sidebar';
import Usermenu from '../userMenu';
import { summaryColumns, activityList } from '../../utils/cardBuilder';
import Button from '../button';

class Dashboard extends Component {
  state = {
    showSidebar: true,
    isMobile: window.innerWidth <= 769,
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const isMobile = windowWidth <= 769;
    this.setState({ isMobile, showSidebar: !isMobile });
  }

  renderToggler = (classes) => (
    <div className={classes}>
      <button
        className="button sidebar-trigger"
        onClick={this.toggleSidebar}
      >
        <span className="sidebar-trigger__icon" />
      </button>
    </div>
  );

  toggleSidebar = () => {
    const { showSidebar } = this.state;
    this.setState({ showSidebar: !showSidebar });
  };

  summaryColumn = (item) => {
    const classNames = `summary-icon-wrapper ${item.id}`;
    return (
      <div key={item.id} className="column">
        <div className="card">
          <div className="card-content">
            <div className="icon-group">
              <div className={`icon-bg ${item.id}`} />
              <div className={classNames}>
                <img className="summary-icon responsive" src={item.iconSrc} alt={item.altText} />
              </div>
            </div>
            <div className="summary-description">
              <p className="summary-description__title">{item.title}</p>
              <p className="summary-description__sub-text">{item.value}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  activtyList = (activity, idx) => (
    <div key={idx} className="activity">
      <div className="activity--left">
        <span className="activity__name">{activity.name}</span>
        <span className="activity__item">{activity.item}</span>
        {activity.attributes !== [] ? activity.attributes
          .map((attr, indx) => (<span key={indx} className="activity__attr">{attr}</span>)) : null}
      </div>
      <div className="activity--right">
        <span className="activity__user">{activity.user}</span>
        <span className="activity__time">{activity.time}</span>
      </div>
    </div>
  );

  render() {
    const { showSidebar, isMobile } = this.state;
    const devProps = {
      currentUser: { firstName: 'John', lastName: 'Doe' },
      toggleDropdown: () => { },
      showDropdown: false,
      handleLogout: () => { },
    };
    const classes = showSidebar ? 'sidebar-toggler sidebar-open' : 'sidebar-toggler';
    return (
      <div className="dashboard-wrapper">
        {(isMobile && showSidebar && (<Sidebar showSidebar={showSidebar} />))
          || (!isMobile && <Sidebar showSidebar={showSidebar} />)}
        {isMobile && this.renderToggler(classes)}
        <div className="dashboard-content">
          <div className="user-menu">
            <Usermenu {...devProps} />
          </div>
          <div className="content-area">
            <h2 className="content-area__title">Item Summary</h2>
            <div className="summary-cards">
              <div className="columns is-mobile is-variable is-1-mobile is-1-tablet is-4-desktop is-8-widescreen is-2-fullhd">
                {summaryColumns.map((item) => this.summaryColumn(item))}
              </div>
            </div>
            <h2 className="content-area__title">Recent Activity</h2>
            {activityList.map((activity, idx) => this.activtyList(activity, idx))}
            <div className="activity-btn-wrapper has-text-centered">
              <Button
                label="View all activity"
                type="transparent"
                path="/activity"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
