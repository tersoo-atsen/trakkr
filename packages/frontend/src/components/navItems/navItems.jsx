import React from 'react';
import { Link } from 'react-router-dom';

import './navItems.scss';
import Button from '../button';
import ProfilePhoto from '../../assets/images/user.png';
import ExpandArrow from '../../assets/images/expand-arrow.png';

const NavItems = (Props) => {
  const {
    loggedIn, currentUser, buttonClass, toggleMenu, showMenu, handleLogout,
  } = Props;

  return (
    !loggedIn
      ? (
        <>
          <Button classes={buttonClass} path="/login" label="Sign in" type="transparent" />
          <Button path="/signup" label="Sign up" type="round" />
        </>
      )
      : (
        <>
          <p className="user_name">
            {currentUser.firstName}
            &nbsp;
            {currentUser.lastName}
          </p>
          <img src={ProfilePhoto} alt="user profile" />
          <div className="dropdown">
            <button className="dropdown__button" onClick={toggleMenu}>
              <img src={ExpandArrow} alt="expand arrow" className="dropdown__expand_arrow" />
            </button>
            {
              showMenu ? (
                <div className="dropdown__content">
                  <Link className="dropdown" to="/Profile">User Profile</Link>
                  <button className="dropdown__logout_button" onClick={handleLogout}>Log Out</button>
                </div>
              ) : null
            }
          </div>
        </>
      )
  );
};

export default NavItems;
