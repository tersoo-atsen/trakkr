/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import './navbar.scss';
import trakkrLogo from '../../assets/images/trakkr_logo.png';
import NavItems from '../navItems';
import authActions from '../../store/actions';

export class Navbar extends Component {
  container = React.createRef();

  state = { isTop: true, showDropdown: false };

  componentDidMount() {
    this._isMounted = true;
    this.handleScroll();
    document.addEventListener('mouseup', this.closeDropdown);
  }

  componentWillUnmount() {
    this._isMounted = false;
    document.removeEventListener('mouseup', this.closeDropdown);
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

  render() {
    const { isTop, showDropdown } = this.state;
    const { loggedIn, currentUser } = this.props;
    const navClasses = isTop ? 'navbar is-fixed-top transparent' : 'navbar is-fixed-top colored';
    const buttonClass = isTop ? '' : 'buttons--white-text';
    return (
      <nav className={navClasses}>
        <div className="navbar-brand navbar-start">
          <Link className="navbar-item" to="/">
            <img className="trakkr_logo" src={trakkrLogo} alt="trakkr logo" />
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons" ref={this.container}>
              <NavItems
                loggedIn={loggedIn}
                currentUser={currentUser}
                buttonClass={buttonClass}
                openDropdown={this.openDropdown}
                showDropdown={showDropdown}
                handleLogout={this.handleLogout}
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  const { loggedIn, currentUser } = state.global;
  return {
    loggedIn,
    currentUser,
  };
};
const ConnectedNavbar = compose(withRouter, connect(mapStateToProps))(Navbar);
export default ConnectedNavbar;
