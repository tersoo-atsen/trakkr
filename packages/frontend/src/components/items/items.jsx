import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Image, Transformation } from 'cloudinary-react';

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
                <Image
                  cloudName="tersoo"
                  publicId={item.imageUrl}
                  className="profile-pic"
                  crop="fit"
                >
                  <Transformation quality="80" fetchFormat="auto" />
                  <Transformation width="50" height="50" gravity="face" />
                </Image>
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
        {({ loading, error, data }) => {
          const { results, pageInfo } = data ? data.getUserItems : {};
          if (loading) return <Loader />;
          if (error) return <Error message="An error occurred" />;

          return (
            <div className="item-page_wrapper">
              <div className="item-page-top">
                <div className="item-area__title">
                  <span className="title-main">My Items</span>
                  <span className="title-sub">List of items</span>
                </div>
                <div className="button-area">
                  <span className="button-area__text">Create New</span>
                  <a href="#top" className="button new-item-btn">+</a>
                </div>
              </div>
              {results.length < 1
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
                        {renderContent(results)}
                      </tbody>
                    </table>
                    <div className="pagination-area">
                      <Pagination
                        totalPages={pageInfo.pages}
                        hasNext={pageInfo.hasNextPage}
                        handleData={this.fetchItems}
                        hasPrevious={pageInfo.hasPrevPage}
                        isFetching={loading}
                        currentPage={page}
                      />
                    </div>
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
