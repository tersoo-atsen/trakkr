/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './editItem.scss';
import {
  validateFields, formValid, uploadImage, apolloClient,
} from '../../utils';
import { EDIT_ITEM } from '../../graphql/mutations';
import { GET_ITEM } from '../../graphql/queries';
import Loader from '../loader';
import Error from '../error';
import { editItem } from '../../store/actions';

export class EditItem extends Component {
  state = {
    itemName: '',
    location: '',
    description: '',
    value: 0,
    quantity: 0,
    imageUrl: '',
    selectedImagePath: '',
    imageFile: '',
    formErrors: {
      itemName: '',
      description: '',
      location: '',
    },
    uploadStatus: '',
  };

  handleChange = (event) => {
    const { value, name, files } = event.target;
    const { itemName, formErrors } = this.state;
    const updatedErrors = validateFields(name, value, formErrors);

    if (files && files[0]) {
      const imageFile = files[0];
      const publicId = itemName.replace(/\s+/g, '-').toLowerCase();
      this.setState({
        imageFile,
        selectedImagePath: URL.createObjectURL(imageFile),
        imageUrl: `trakkr/${publicId}`,
      });
    }

    this.setState({
      formErrors: {
        ...formErrors,
        ...updatedErrors,
      },
      [name]: value,
    });
  }

  handleSubmit = async (event, editItemMutation, id) => {
    event.preventDefault();
    let res;
    const {
      formErrors,
      itemName,
      location,
      description,
      value,
      quantity,
      imageUrl,
      imageFile,
    } = this.state;
    const { dispatch, history } = this.props;
    if (imageFile) res = await uploadImage(imageFile, imageUrl, apolloClient);
    if (res === null) this.setState({ uploadStatus: 'Failure' });
    if (formValid(this.state)) {
      const editItemArgs = {
        history,
        editItemMutation,
        id,
        name: itemName,
        location,
        description,
        value,
        quantity,
        imageUrl,
      };
      dispatch(editItem(editItemArgs));
    } else {
      this.setState({
        formErrors: {
          ...formErrors,
          itemName: 'Item name is required',
          description: 'Description is required',
          location: 'Location is required',
        },
      });
    }
  };

  setFieldValues = (item) => {
    this.setState({
      itemName: item.name,
      location: item.location,
      value: item.value,
      imageUrl: item.imageUrl,
      description: item.description,
      quantity: item.quantity,
    });
  }

  render() {
    const {
      itemName,
      location,
      description,
      value,
      quantity,
      imageUrl,
      selectedImagePath,
      formErrors,
    } = this.state;
    const { history } = this.props;
    const id = +history.location.pathname.split('/')[2];

    return (
      <Query
        query={GET_ITEM}
        variables={{ id }}
        onCompleted={(data) => this.setFieldValues(data.getItem)}
      >
        {({ loading, error }) => {
          if (loading) return <Loader />;
          if (error) return <Error message="An error occurred" />;

          return (
            <Mutation
              mutation={EDIT_ITEM}
              variables={{
                id, name: itemName, description, value, location, quantity, imageUrl,
              }}
            >
              {(editItemMutation, { mutationloading, mutationerror }) => (
                <div className="add-item-page_wrapper">
                  <div className="add-item-page">
                    <div className="activity-area__title">
                      <span className="title-main is-size-4">Edit Item</span>
                    </div>
                    <div className="add-item__page__form_error_wrapper">
                      {mutationerror && <pre>Somthing went wrong, please try again.</pre>}
                    </div>
                    <form
                      className="add-item_form"
                      onSubmit={(e) => this.handleSubmit(e, editItemMutation, id)}
                      noValidate
                    >
                      <div className="add-item_form_wrapper">
                        <div className="columns">
                          <div className="column is-one-quarter">
                            <div className="item-pic-wrapper">
                              {
                                selectedImagePath ? <img className="preview-image" src={selectedImagePath} alt="preview" />
                                  : (
                                    <Image
                                      cloudName="tersoo"
                                      publicId={imageUrl}
                                      className="item-pic responsive"
                                      width="150"
                                      height="150"
                                      crop="fit"
                                    >
                                      <Transformation quality="80" fetchFormat="auto" />
                                    </Image>
                                  )
                              }
                              <div>
                                <p className="format-guide">Format should be .jpg, .jpeg, and .png.</p>
                              </div>
                              <div className="item-pic_uploader">
                                <input
                                  type="file"
                                  name="file"
                                  id="file"
                                  className="inputfile"
                                  accept="image/*"
                                  onChange={this.handleChange}
                                />
                                <label htmlFor="file">Change Image</label>
                              </div>
                            </div>
                          </div>
                          <div className="column">
                            <div className="field is-horizontal">
                              <div className="field-body">
                                <div className="field">
                                  <div className="control">
                                    <input
                                      className={formErrors.itemName.length > 0 ? 'is_invalid input form_input' : 'input form_input'}
                                      name="itemName"
                                      type="text"
                                      placeholder="Name"
                                      value={itemName}
                                      onChange={this.handleChange}
                                      required
                                    />
                                    <div className="error-message form_error">
                                      <span>{formErrors.itemName}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="field is-horizontal">
                              <div className="field-body">
                                <div className="field">
                                  <div className="field">
                                    <div className="control">
                                      <input
                                        className="input form_input"
                                        name="location"
                                        type="text"
                                        placeholder="Location"
                                        value={location}
                                        onChange={this.handleChange}
                                        required
                                      />
                                      <div className="error-message form_error">
                                        <span>{formErrors.location}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="field is-horizontal">
                              <div className="field-body">
                                <div className="field">
                                  <div className="field">
                                    <label htmlFor="value" className="label">Value</label>
                                    <div className="control">
                                      <input
                                        className="input value form_input"
                                        name="value"
                                        type="number"
                                        min="1"
                                        placeholder="Value"
                                        value={value}
                                        onChange={this.handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="field">
                                  <label htmlFor="quantity" className="label">Quantity</label>
                                  <div className="control is-expanded">
                                    <input
                                      className="input quantity form_input"
                                      name="quantity"
                                      type="number"
                                      min="1"
                                      placeholder="Quantity"
                                      value={quantity}
                                      onChange={this.handleChange}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="field is-horizontal">
                              <div className="field-body">
                                <div className="field is-expanded">
                                  <div className="field">
                                    <div className="control is-expanded">
                                      <textarea
                                        className={formErrors.description.length > 0 ? 'is_invalid textarea form_input' : 'textarea form_input'}
                                        name="description"
                                        type="text"
                                        placeholder="Item Description"
                                        value={description}
                                        onChange={this.handleChange}
                                        required
                                      />
                                      <div className="error-message form_error">
                                        <span>{formErrors.description}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="field is-grouped is-grouped-right">
                          <p className="control">
                            <button className={
                              mutationloading
                                ? 'button add-item_form_submit_button is-loading'
                                : 'button add-item_form_submit_button'
                            }
                            >
                              Submit
                            </button>
                          </p>
                          <p className="control">
                            <Link className="button add-item_form_cancel_button" to="/items">Cancel</Link>
                          </p>
                        </div>

                      </div>
                    </form>
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
EditItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  }).isRequired,
};
const ConnectedEditItem = connect()(EditItem);
export default ConnectedEditItem;
