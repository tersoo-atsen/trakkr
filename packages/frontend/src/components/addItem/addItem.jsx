/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './addItem.scss';
import {
  validateFields, formValid, uploadImage, apolloClient,
} from '../../utils';
import { ADD_ITEM } from '../../graphql/mutations';
import { addItem } from '../../store/actions';

export class AddItem extends Component {
  state = {
    itemName: '',
    location: '',
    description: '',
    value: 0,
    quantity: 0,
    imageUrl: 'trakkr/default-item-image',
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
      const publicId = itemName.replace(/\s+/g, '-').toLowerCase();
      const imageFile = files[0];
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

  handleSubmit = async (event, addItemMutation) => {
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
    if (formValid(this.state)) {
      const addItemArgs = {
        history,
        addItemMutation,
        name: itemName,
        location,
        description,
        value,
        quantity,
        imageUrl,
      };
      if (imageFile) res = await uploadImage(imageFile, imageUrl, apolloClient);
      if (res === null) this.setState({ uploadStatus: 'Failure' });
      dispatch(addItem(addItemArgs));
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
    const { currentUser } = this.props;

    return (
      <Mutation
        mutation={ADD_ITEM}
        variables={{
          id: currentUser.id, name: itemName, description, value, location, quantity, imageUrl,
        }}
      >
        {(addItemMutation, { loading, error }) => (
          <div className="add-item-page_wrapper">
            <div className="add-item-page">
              <div className="activity-area__title">
                <span className="title-main is-size-4">Create New Item</span>
              </div>
              <div className="add-item__page__form_error_wrapper">
                {error && /* istanbul ignore next */(
                  <pre>
                    {error.graphQLErrors.map(/* istanbul ignore next */({ message }, idx) => (
                      <span key={idx}>{message}</span>
                    ))}
                  </pre>
                )}
              </div>
              <form className="add-item_form" onSubmit={(e) => this.handleSubmit(e, addItemMutation)} noValidate>
                <div className="add-item_form_wrapper">
                  <div className="columns">
                    <div className="column is-one-quarter">
                      <div className="item-pic-wrapper">
                        {selectedImagePath
                          ? <img className="preview-image" src={selectedImagePath} alt="preview" />
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
                          )}
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
                          <label htmlFor="file">Add Image</label>
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
                      <button className={loading ? 'button add-item_form_submit_button is-loading' : 'button add-item_form_submit_button'}>
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
  }
}

AddItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
const mapStateToProps = (state) => {
  const { currentUser } = state.global;
  return { currentUser };
};
const ConnectedAddItem = connect(mapStateToProps)(AddItem);
export default ConnectedAddItem;
