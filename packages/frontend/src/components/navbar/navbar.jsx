/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import './navbar.scss';
import trakkrLogo from '../../assets/images/trakkr-logo.svg';
import NavItems from '../navItems';
import authActions from '../../store/actions';

export class Navbar extends Component {
  container = React.createRef();

  state = { isTop: true, showMenu: false };

  componentDidMount() {
    this._isMounted = true;
    this.handleScroll();
    document.addEventListener('mouseup', this.closeMenu);
  }

  componentWillUnmount() {
    this._isMounted = false;
    document.removeEventListener('mouseup', this.closeMenu);
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

  openMenu = (event) => {
    event.preventDefault();
    const { showMenu } = this.state;

    this.setState({ showMenu: !showMenu });
  }

  closeMenu = (event) => {
    /* istanbul ignore else */
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({ showMenu: false });
    }
  }

  handleLogout = () => {
    const { dispatch, history } = this.props;

    authActions.logout(dispatch, history);
  }

  render() {
    const { isTop, showMenu } = this.state;
    const { loggedIn, currentUser } = this.props;
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
            <div className="buttons" ref={this.container}>
              <NavItems
                loggedIn={loggedIn}
                currentUser={currentUser}
                buttonClass={buttonClass}
                toggleMenu={this.openMenu}
                showMenu={showMenu}
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
  currentUser: PropTypes.objectOf(PropTypes.string).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { loggedIn, user } = state.global;
  return {
    loggedIn,
    currentUser: user,
  };
};

const ConnectedNavbar = compose(withRouter, connect(mapStateToProps))(Navbar);

export default ConnectedNavbar;
