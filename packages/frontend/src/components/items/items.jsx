import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import './items.scss';
import { GET_USER_ITEMS } from '../../graphql/queries';
import Pagination from '../pagination';
import Loader from '../loader';
import Error from '../error';
import NoContent from '../noContent';
import Overflow from '../overflow';

export class Items extends Component {
  state = {
    page: 1,
  }

  fetchItems = (pageNumber) => {
    this.setState({
      page: pageNumber,
    });
  };

  render() {
    const { currentUser } = this.props;
    const { page } = this.state;

    const renderContent = (items) => (
      items.map((item) => (
        <tr className="user-item" key={item.id}>
          <td>
            <div className="item_wrapper">
              <div className="item-thumbnail">
                <img src={item.imageUrl} alt="" />
              </div>
              <div className="item_meta">
                <span>{item.name}</span>
                {' '}
                <br />
                <span className="item-description">{item.description}</span>
              </div>
            </div>
          </td>
          <td>
            <span>{item.value}</span>
          </td>
          <td>{item.quantity}</td>
          <td>{item.location}</td>
          <td>
            <Overflow />
          </td>
        </tr>
      ))
    );

    return (
      <Query query={GET_USER_ITEMS} variables={{ userId: currentUser.id, page }}>
        {({
          loading,
          error,
          data,
        }) => {
          const { items, pageInfo } = data ? data.getUserItems : [];
          if (loading) return <Loader />;
          if (error) return <Error message="An error occurred" />;

          return (
            <div className="item-page_wrapper">
              <div className="button-area">
                <a href="#top" className="button new-item-btn">Add New Item</a>
              </div>
              {items.length < 1
                ? <NoContent />
                : (
                  <>
                    <table className="table is-fullwidth">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Value</th>
                          <th>Quantity</th>
                          <th>Location</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderContent(items)}
                      </tbody>
                    </table>
                    <Pagination
                      totalPages={pageInfo.pages}
                      hasNext={pageInfo.hasNextPage}
                      handleData={this.fetchItems}
                      hasPrevious={pageInfo.hasPrevPage}
                      isFetching={loading}
                      currentPage={page}
                    />
                  </>
                )}
            </div>
          );
        }}
      </Query>
    );
  }
}

Items.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};
const mapStateToProps = (state) => {
  const { currentUser } = state.global;
  return { currentUser };
};
const ConnectedItems = connect(mapStateToProps)(Items);
export default ConnectedItems;
