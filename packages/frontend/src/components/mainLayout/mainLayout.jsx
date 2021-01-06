/* eslint-disable no-underscore-dangle */
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './mainLayout.scss';
import Sidebar from '../sidebar';
import Usermenu from '../userMenu';
import authActions from '../../store/actions';

export class MainLayout extends Component {
  container = React.createRef();

  state = {
    showSidebar: true,
    isMobile: window.innerWidth <= 769,
    showDropdown: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    document.addEventListener('mouseup', this.closeDropdown);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.updateDimensions);
    document.removeEventListener('mouseup', this.closeDropdown);
  }

  updateDimensions = () => {
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth <= 769;
    this.setState({ isMobile, showSidebar: !isMobile });
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

  renderToggler = (classes) => (
    <div className={classes}>
      <button
        className="button sidebar-trigger"
        onClick={this.toggleSidebar}
      >
        <span className="sidebar-trigger__icon" />
      </button>
    </div>
  );

  toggleSidebar = () => {
    const { showSidebar, isMobile } = this.state;
    if (isMobile) this.setState({ showSidebar: !showSidebar });
  };

  render() {
    const { children, currentUser } = this.props;
    const { showSidebar, isMobile, showDropdown } = this.state;
    const classes = showSidebar ? 'sidebar-toggler sidebar-open' : 'sidebar-toggler';

    return (
      <div className="main-layout_wrapper">
        {
          (isMobile
            && showSidebar
            && (<Sidebar showSidebar={showSidebar} toggleSidebar={this.toggleSidebar} />)
          )
          || (!isMobile
            && (<Sidebar showSidebar={showSidebar} toggleSidebar={this.toggleSidebar} />)
          )
        }

        { isMobile && this.renderToggler(classes)}

        <div className="user-menu" ref={this.container}>
          <Usermenu
            currentUser={currentUser}
            openDropdown={this.openDropdown}
            showDropdown={showDropdown}
            handleLogout={this.handleLogout}
          />
        </div>

        <div className="main-content">
          {children}
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

const mapStateToProps = (state) => {
  const { currentUser } = state.global;
  return {
    currentUser,
  };
};

const ConnectedMainLayout = connect(mapStateToProps)(withRouter(MainLayout));
export default ConnectedMainLayout;
