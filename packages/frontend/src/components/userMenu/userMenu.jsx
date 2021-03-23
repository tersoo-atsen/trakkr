import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Transformation } from 'cloudinary-react';

import './userMenu.scss';

const UserMenu = (props) => {
  const {
    currentUser, openDropdown, showDropdown, handleLogout,
  } = props;
  return (
    <div className="profile-menu">
      <p className="user_name">
        {currentUser.firstName}
        &nbsp;
        {currentUser.lastName}
      </p>
      <Image
        className="avatar"
        alt="user profile"
        cloudName="tersoo"
        publicId={currentUser.avatarUrl}
        width="19"
        height="19"
        crop="fit"
      >
        <Transformation quality="80" fetchFormat="auto" />
      </Image>
      <div className="dropdown">
        <button className="dropdown__button" onClick={openDropdown}>
          <FontAwesomeIcon className="dropdown__expand_arrow" icon="angle-down" />
        </button>
        {
          showDropdown ? (
            <div className="dropdown__content">
              <Link className="dropdown__dashboard_button" to="/dashboard">Dashboard</Link>
              <Link className="dropdown__profile_button" to="/profile">User Profile</Link>
              <button className="dropdown__logout_button" onClick={handleLogout}>Log Out</button>
            </div>
          ) : null
        }
      </div>
    </div>
  );
};
UserMenu.propTypes = {
  currentUser: PropTypes
    .objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  openDropdown: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
export default UserMenu;
