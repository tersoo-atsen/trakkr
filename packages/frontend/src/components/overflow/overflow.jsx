import React, { Component } from 'react';

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
          <button
            className="trigger"
            onClick={this.showMenu}
          >
            <FontAwesomeIcon icon="ellipsis-h" />
          </button>
          {
            showMenu
              ? (
                <div className="drop-menu">
                  <div className="menu-item">Edit</div>
                  <div className="menu-item">Delete</div>
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
