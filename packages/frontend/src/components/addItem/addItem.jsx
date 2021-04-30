/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './addItem.scss';
import { validateFields, formValid, apolloClient } from '../../utils';
import { ADD_ITEM } from '../../graphql/mutations';
import { GET_SIGNATURE } from '../../graphql/queries';
import { addItem } from '../../store/actions';

export class AddItem extends Component {
  state = {
    name: '',
    location: '',
    description: '',
    value: 0,
    quantity: 0,
    imageUrl: 'trakkr/default-item-image',
    selectedImagePath: '',
    imageFile: '',
    formErrors: {
      name: '',
      description: '',
      location: '',
    },
  };

  handleChange = (event) => {
    const { value, name, files } = event.target;
    const { formErrors } = this.state;
    const updatedErrors = validateFields(name, value, formErrors);

    if (files && files[0]) {
      const imageFile = files[0];
      this.setState({
        imageFile,
        selectedImagePath: URL.createObjectURL(imageFile),
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

  uploadImage = async (file, imageUrl) => {
    const publicId = imageUrl.split('/')[1];
    const sigResponse = await apolloClient.query({
      query: GET_SIGNATURE,
      variables: { publicId },
    });
    const { signature, timestamp } = sigResponse.data.getSignature;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('invalidate', true);
    formData.append('folder', process.env.CLOUDINARY_FOLDER);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    formData.append('api_key', process.env.CLOUDINARY_API_KEY);
    formData.append('public_id', publicId);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);

    const options = {
      method: 'POST',
      body: formData,
    };

    try {
      await fetch(`${process.env.CLOUDINARY_URL}`, options);
    } catch (e) {
      this.setState({ uploadStatus: 'Failure' });
      return null;
    }
    return null;
  }


  handleSubmit = async (event, addItemMutation) => {
    event.preventDefault();
    const {
      formErrors,
      name,
      location,
      description,
      value,
      quantity,
      imageUrl,
      imageFile,
    } = this.state;
    const { dispatch } = this.props;

    if (imageFile) await this.uploadImage(imageFile, imageUrl);

    if (formValid(this.state)) {
      const addItemArgs = {
        addItemMutation,
        name,
        location,
        description,
        value,
        quantity,
        imageUrl,
      };
      dispatch(addItem(addItemArgs));
    } else {
      this.setState({
        formErrors: {
          ...formErrors,
          name: 'Name is required',
          description: 'Description is required',
          location: 'Location is required',
        },
      });
    }
  };

  render() {
    const {
      name,
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
          id: currentUser.id, name, description, value, location, quantity, imageUrl,
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
                    <div className="column is-one-third">
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
                                className={formErrors.name.length > 0 ? 'is_invalid input form_input' : 'input form_input'}
                                name="name"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={this.handleChange}
                                required
                              />
                              <div className="error-message form_error">
                                <span>{formErrors.name}</span>
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

                  <div className="field is-grouped is-grouped-centered">
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
};
const mapStateToProps = (state) => {
  const { currentUser } = state.global;
  return { currentUser };
};
const ConnectedAddItem = connect(mapStateToProps)(AddItem);
export default ConnectedAddItem;
