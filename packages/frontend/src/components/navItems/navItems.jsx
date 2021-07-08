import React from 'react';

import './navItems.scss';
import Button from '../button';
import UserMenu from '../userMenu';

const NavItems = (Props) => {
  const {
    loggedIn,
    currentUser,
    buttonClass,
    toggleDropdown,
    showDropdown,
    handleLogout,
  } = Props;

  return (
    !loggedIn
      ? (
        <>
          <Button classes={buttonClass} path="/login" label="Log in" type="transparent" />
          <Button path="/signup" label="Sign up" type="round" />
        </>
      )
      : (
        <UserMenu
          currentUser={currentUser}
          toggleDropdown={toggleDropdown}
          showDropdown={showDropdown}
          handleLogout={handleLogout}
        />
      )
  );
};

export default NavItems;
