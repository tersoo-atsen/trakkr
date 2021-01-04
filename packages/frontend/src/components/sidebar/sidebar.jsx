import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './sidebar.scss';
import trakkrLogo from '../../assets/images/trakkr_logo.png';
import dashboardIcon from '../../assets/images/dashboard-icon.png';
import listIcon from '../../assets/images/list-icon.png';
import activityIcon from '../../assets/images/activity-icon.png';

function Sidebar(props) {
  const { showSidebar, toggleSidebar } = props;
  const classNames = showSidebar ? 'menu show' : 'menu';

  return (
    <aside className={classNames}>
      <div className="logo-wrapper">
        <Link className="logo-link" to="/">
          <img className="trakkr-logo" src={trakkrLogo} alt="trakkr logo" />
        </Link>
      </div>
      <ul className="menu-list">
        <li className="menu-list-item">
          <NavLink to="/dashboard" onClick={toggleSidebar}>
            <img className="menu-list-item__icon" src={dashboardIcon} alt="Dash icon" />
            <span className="menu-list-item__text">Home</span>
          </NavLink>
        </li>
        <li className="menu-list-item">
          <NavLink to="/items" onClick={toggleSidebar}>
            <img className="menu-list-item__icon" src={listIcon} alt="List" />
            <span className="menu-list-item__text">Items</span>
          </NavLink>
        </li>
        <li className="menu-list-item">
          <NavLink to="/activity" onClick={toggleSidebar}>
            <img className="menu-list-item__icon" src={activityIcon} alt="Activity" />
            <span className="menu-list-item__text">Activity</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
export default Sidebar;
