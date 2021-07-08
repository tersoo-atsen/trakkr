import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './overflow.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Overflow extends Component {
  state = {
    showMenu: false,
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu);
  }

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
    const { id, toggleModal } = this.props;

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
                  <Link className="menu-item" to={`/edit-item/${id}`}>Edit</Link>
                  <button className="delete-item menu-item" onClick={() => toggleModal(id)}>Delete</button>
                </div>
              )
              : (null)
          }
        </div>
      </div>
    );
  }
}

Overflow.propTypes = {
  id: PropTypes.number.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Overflow;
