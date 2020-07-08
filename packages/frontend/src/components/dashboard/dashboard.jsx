/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './dashboard.scss';
import Sidebar from '../sidebar';
import Usermenu from '../userMenu';
import Button from '../button';
import Loader from '../loader';
import Error from '../error';
import { summaryList, summaryColumns, activtyList } from '../../utils';
import { GET_USER_ACTIVITIES } from '../../graphql/queries';
import authActions from '../../store/actions';

export class Dashboard extends Component {
  container = React.createRef();

  state = {
    showSidebar: true,
    isMobile: window.innerWidth <= 769,
    showDropdown: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    document.addEventListener('mouseup', this.closeDropdown);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.updateDimensions);
    document.removeEventListener('mouseup', this.closeDropdown);
  }

  updateDimensions = () => {
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth <= 769;
    this.setState({ isMobile, showSidebar: !isMobile });
  }

  openDropdown = (event) => {
    event.preventDefault();
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
  }

  closeDropdown = (event) => {
    /* istanbul ignore else */
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({ showDropdown: false });
    }
  }

  handleLogout = () => {
    const { dispatch, history } = this.props;
    authActions.logout(dispatch, history);
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

  content = (activities) => (
    <>
      {activities.map((activity, idx) => activtyList(activity, idx))}
      <div className="activity-btn-wrapper has-text-centered">
        <Button
          label="View all activity"
          type="transparent"
          path="/activity"
        />
      </div>
    </>
  );

  render() {
    const { currentUser } = this.props;
    const { showSidebar, isMobile, showDropdown } = this.state;
    const classes = showSidebar ? 'sidebar-toggler sidebar-open' : 'sidebar-toggler';
    return (
      <Query query={GET_USER_ACTIVITIES} variables={{ userId: currentUser.id }}>
        {({ loading, error, data }) => {
          const activities = data ? data.getUserActivities : [];
          if (loading) return <Loader />;
          if (error) return <Error message="An error occurred" />;
          if (activities.length > 5) activities.length = 5;

          return (
            <div className="dashboard-wrapper">
              {(isMobile && showSidebar && (<Sidebar showSidebar={showSidebar} />))
                || (!isMobile && <Sidebar showSidebar={showSidebar} />)}
              {isMobile && this.renderToggler(classes)}
              <div className="dashboard-content" name="dashboardContent">
                <div className="user-menu" ref={this.container}>
                  <Usermenu
                    currentUser={currentUser}
                    openDropdown={this.openDropdown}
                    showDropdown={showDropdown}
                    handleLogout={this.handleLogout}
                  />
                </div>
                <div className="content-area">
                  <h2 className="content-area__title">Item Summary</h2>
                  <div className="summary-cards">
                    <div className="columns is-mobile is-variable is-1-mobile is-1-tablet is-4-desktop is-8-widescreen is-2-fullhd">
                      {summaryList.map((item) => summaryColumns(item))}
                    </div>
                  </div>
                  <h2 className="content-area__title">Recent Activity</h2>
                  {activities.length === 0 ? <p>Such empty!</p> : this.content(activities)}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};
const mapStateToProps = (state) => {
  const { currentUser } = state.global;
  return {
    currentUser,
  };
};
const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
export default ConnectedDashboard;
