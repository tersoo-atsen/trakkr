import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './items.scss';
import 'react-toastify/dist/ReactToastify.css';
import { GET_USER_ITEMS } from '../../graphql/queries';
import { DELETE_ITEM } from '../../graphql/mutations';
import { ITEM_ADDED } from '../../graphql/subscriptions';
import Pagination from '../pagination';
import Loader from '../loader';
import Error from '../error';
import Overflow from '../overflow';
import Modal from '../modal';
import { apolloClient } from '../../utils';

export class Items extends Component {
  state = {
    page: 1,
    showModal: false,
    itemId: null,
  }

  fetchItems = (pageNumber) => {
    this.setState({ page: pageNumber });
  };

  handleDelete = async () => {
    const { itemId } = this.state;
    const notifySuccess = () => toast('Item successfully deleted.');
    const notifyFailure = () => toast('Something went wrong, please try again.');
    try {
      await apolloClient.mutate({
        mutation: DELETE_ITEM,
        variables: { id: itemId },
      });
      notifySuccess();
      this.closeModal();
    } catch (e) {
      notifyFailure();
    }
  };

  toggleModal = (id) => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
      itemId: id,
    });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { currentUser } = this.props;
    const { page, showModal } = this.state;
    let unsubscribe = null;
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
            <Overflow
              id={item.id}
              toggleModal={this.toggleModal}
            />
          </td>
        </tr>
      ))
    );

    return (
      <Query query={GET_USER_ITEMS} variables={{ userId: currentUser.id, page }}>
        {({
          loading, error, data, subscribeToMore,
        }) => {
          if (loading) return <Loader />;
          if (error) return <Error message="An error occurred" />;
          const { results, pageInfo } = data ? data.getUserItems : {};

          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: ITEM_ADDED,
              updateQuery: (previousResult, { subscriptionData }) => {
                if (!subscriptionData.data) return previousResult;
                const { itemCreated } = subscriptionData.data;
                return {
                  ...previousResult,
                  getUserItems: {
                    ...previousResult.getUserItems,
                    results: [
                      itemCreated.item,
                      ...previousResult.getUserItems.results,
                    ],
                  },
                };
              },
            });
          }

          return (
            <div className="item-page_wrapper">
              {
                showModal
                  ? (
                    <Modal
                      closeModal={this.closeModal}
                      handleDelete={this.handleDelete}
                    />
                  )
                  : null
              }
              <div className="item-page-top">
                <div className="item-area__title">
                  <span className="title-main">My Items</span>
                  <span className="title-sub">List of items</span>
                </div>
                <div className="button-area">
                  <span className="button-area__text">Create New</span>
                  <Link className="button new-item-btn" to="/add-item">+</Link>
                </div>
              </div>
              {
                data.getUserItems.results.length
                  ? (
                    <>
                      <div className="table-wrap">
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
                            {renderContent(results, subscribeToMore)}
                          </tbody>
                        </table>
                      </div>
                      <div className="pagination-area">
                        <Pagination
                          handleData={this.fetchItems}
                          pageInfo={pageInfo}
                          isFetching={loading}
                          currentPage={page}
                        />
                      </div>
                    </>
                  )
                  : (
                    <p className="has-text-grey is-size-6 has-text-centered">
                      Click &quot;Create New&quot; to start adding items
                    </p>
                  )
              }

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
