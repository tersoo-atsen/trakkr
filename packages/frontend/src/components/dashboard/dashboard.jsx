import React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './dashboard.scss';
import Button from '../button';
import Loader from '../loader';
import Error from '../error';
import { summaryList, summaryColumns, activtyList } from '../../utils';
import { GET_USER_ACTIVITIES } from '../../graphql/queries';

export const Dashboard = (props) => {
  const { currentUser } = props;
  const content = (activities) => (
    <>
      {activities.map((activity, idx) => activtyList(activity, idx))}
      <div className="activity-btn-wrapper has-text-centered">
        <Button label="View all activity" type="transparent" path="/activity" />
      </div>
    </>
  );

  return (
    <Query query={GET_USER_ACTIVITIES} variables={{ userId: currentUser.id }}>
      {({ loading, error, data }) => {
        const activities = data ? data.getUserActivities : [];
        if (loading) return <Loader />;
        if (error) return <Error message="An error occurred" />;

        return (
          <div className="dashboard-wrapper">
            <div className="dashboard-content" name="dashboardContent">
              <div className="content-area">
                <h2 className="content-area__title">Item Summary</h2>
                <div className="summary-cards">
                  <div className="columns is-mobile is-variable is-1-mobile is-1-tablet is-4-desktop is-8-widescreen is-2-fullhd">
                    {summaryList.map((item) => summaryColumns(item))}
                  </div>
                </div>
                <h2 className="content-area__title">Recent Activity</h2>
                {activities.length < 1
                  ? (
                    <div className="no-content">
                      <p className="no-content_title">Wow such empty</p>
                      <p className="no-content_text">Add items to start seeing your activities</p>
                    </div>
                  )
                  : content(activities)}
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

Dashboard.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};
const mapStateToProps = (state) => {
  const { currentUser } = state.global;
  return { currentUser };
};
const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
export default ConnectedDashboard;
