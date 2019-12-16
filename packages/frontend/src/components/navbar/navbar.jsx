import React, { Component } from 'react';

import './navbar.scss';
import Button from '../button';
import trakkrLogo from '../../../public/trakkr-logo.svg';

class Navbar extends Component {
  state = {};

  render() {
    return (
      <nav className="navbar is-fixed-top is-transparent">
        <div className="navbar-brand navbar-start">
          <a className="navbar-item is-capitalized" href="/">
            <img className="trakkr_logo" src={trakkrLogo} alt="trakkr logo" />
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Button label="Sign in" type="transparent" />
              <Button label="Sign up" type="round" />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
