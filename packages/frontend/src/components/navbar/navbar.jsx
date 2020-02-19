/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';
import Button from '../button';
import trakkrLogo from '../../assets/images/trakkr-logo.svg';

export class Navbar extends Component {
  state = { isTop: true };

  componentDidMount() {
    this._isMounted = true;
    this.handleScroll();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleScroll = () => {
    document.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY < 40;
      const { isTop } = this.state;
      if (scrollPosition === isTop) {
        return;
      }
      if (this._isMounted) {
        this.setState({ isTop: scrollPosition });
      }
    });
  }

  render() {
    const { isTop } = this.state;
    const navClasses = isTop ? 'navbar is-fixed-top transparent' : 'navbar is-fixed-top colored';
    const buttonClass = isTop ? null : 'buttons--white-text';

    return (
      <nav className={navClasses}>
        <div className="navbar-brand navbar-start">
          <Link className="navbar-item is-capitalized" to="/">
            <img className="trakkr_logo" src={trakkrLogo} alt="trakkr logo" />
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Button classes={buttonClass} path="/login" label="Sign in" type="transparent" />
              <Button path="/logout" label="Sign up" type="round" />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
