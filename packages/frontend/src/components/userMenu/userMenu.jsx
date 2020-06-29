import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './userMenu.scss';
import ProfilePhoto from '../../assets/images/user.png';
import ExpandArrow from '../../assets/images/expand-arrow.png';

const UserMenu = (props) => {
  const {
    currentUser, toggleDropdown, showDropdown, handleLogout,
  } = props;
  return (
    <>
      <p className="user_name">
        {currentUser.firstName}
        &nbsp;
        {currentUser.lastName}
      </p>
      <img className="avatar" src={ProfilePhoto} alt="user profile" />
      <div className="dropdown">
        <button className="dropdown__button" onClick={toggleDropdown}>
          <img src={ExpandArrow} alt="expand arrow" className="dropdown__expand_arrow" />
        </button>
        {
          showDropdown ? (
            <div className="dropdown__content">
              <Link className="dropdown" to="/Profile">User Profile</Link>
              <button className="dropdown__logout_button" onClick={handleLogout}>Log Out</button>
            </div>
          ) : null
        }
      </div>
    </>
  );
};
UserMenu.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.string).isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
export default UserMenu;
