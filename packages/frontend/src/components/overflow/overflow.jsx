import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './oveflow.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Overflow extends Component {
  state = { showMenu: false };

  showMenu = (event) => {
    event.preventDefault();
    const { showMenu } = this.state;

    this.setState({
      showMenu: !showMenu,
    });
    document.addEventListener('click', this.closeMenu);
  }

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    const { showMenu } = this.state;

    return (
      <div className="overflow-wrapper">
        <div className="overflow-menu">
          <button className="trigger" onClick={this.showMenu}>
            <FontAwesomeIcon icon="ellipsis-h" />
          </button>
          {
            showMenu
              ? (
                <div className="drop-menu">
                  <Link className="menu-item" to="/edit-item">Edit</Link>
                  <Link className="menu-item" to="/delete-item">Delete</Link>
                </div>
              )
              : (null)
          }
        </div>
      </div>
    );
  }
}
export default Overflow;
