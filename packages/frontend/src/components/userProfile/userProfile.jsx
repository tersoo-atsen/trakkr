import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Mutation, Query } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './userProfile.scss';
import { GET_USER, GET_SIGNATURE } from '../../graphql/queries';
import { UPDATE_USER } from '../../graphql/mutations';
import { validateFields, formValid, apolloClient } from '../../utils';
import Loader from '../loader';
import Error from '../error';
import { updateUserInfo } from '../../store/actions';

export class UserProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    userName: '',
    avatarUrl: '',
    selectedImagePath: '',
    imageFile: '',
    uploadStatus: '',
    formErrors: {
      firstName: '',
      lastName: '',
      userName: '',
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

  uploadImage = async (file, avatarUrl) => {
    const publicId = avatarUrl.split('/')[1];
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

  handleSubmit = async (event, updateUserMutation) => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      userName,
      imageFile,
      formErrors,
    } = this.state;
    let { avatarUrl } = this.state;
    const { dispatch } = this.props;

    if (imageFile) {
      avatarUrl = (avatarUrl === 'trakkr/default-avatar')
        ? `trakkr/${firstName.toLowerCase()}-${lastName.toLowerCase()}`
        : avatarUrl;
      this.setState({ avatarUrl });
      await this.uploadImage(imageFile, avatarUrl);
    }
    if (formValid(this.state)) {
      const updateUserArgs = {
        updateUserMutation,
        firstName,
        lastName,
        avatarUrl,
        userName,
      };
      dispatch(updateUserInfo(updateUserArgs));
    } else {
      this.setState({
        formErrors: {
          ...formErrors,
          firstName: 'First name is required',
          lastName: 'Last name is required',
          userName: 'Username is required',
        },
      });
    }
  }

  setFieldValues = (user) => {
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      avatarUrl: user.avatarUrl,
    });
  }

  render() {
    const {
      lastName,
      firstName,
      userName,
      formErrors,
      avatarUrl,
      selectedImagePath,
    } = this.state;

    const { currentUser } = this.props;

    return (
      <Query
        query={GET_USER}
        variables={{ id: currentUser.id }}
        onCompleted={(data) => this.setFieldValues(data.getUser)}
      >
        {({ data, loading, error }) => {
          if (loading) return <Loader />;
          if (error) return <Error message="An error occurred" />;
          const user = data ? data.getUser : {};

          return (
            <Mutation mutation={UPDATE_USER} variables={{}}>
              {(updateUserMutation, { loadingMutation, mutationError }) => (
                <div className="user-profile-wrapper">
                  <div className="user-profile-page-top">
                    <p className="user-profile-page__title">
                      <span className="title-main">User profile</span>
                      <span className="title-sub">My Profile</span>
                    </p>
                  </div>
                  <form className="edit-user_form" onSubmit={(e) => this.handleSubmit(e, updateUserMutation)} noValidate>
                    <div className="user-profile_form_wrapper">
                      <div className="profile-pic-wrapper">
                        {selectedImagePath
                          ? <img className="preview-image" src={selectedImagePath} alt="preview" />
                          : (
                            <Image
                              cloudName="tersoo"
                              publicId={avatarUrl}
                              className="profile-pic"
                              width="150"
                              height="150"
                              crop="fit"
                            >
                              <Transformation quality="80" fetchFormat="auto" />
                            </Image>
                          )}
                        <div className="profile-pic_uploader">
                          <input
                            type="file"
                            name="file"
                            id="file"
                            className="inputfile"
                            accept="image/*"
                            onChange={this.handleChange}
                          />
                          <label htmlFor="file">
                            <FontAwesomeIcon
                              className="edit-profile-pic"
                              icon="pencil-alt"
                            />
                          </label>
                        </div>
                        <p className="full-name">
                          <span className="first-name">{currentUser.firstName}</span>
                          <span className="last-name">{currentUser.lastName}</span>
                        </p>
                        <p className="user-email">{user.email}</p>
                      </div>
                      <div className="field is-horizontal">
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <input
                                className={formErrors.firstName.length > 0 ? 'is_invalid input form_input' : 'input form_input'}
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={this.handleChange}
                                required
                              />
                              <div className="error-message form_error">
                                <span>{formErrors.firstName}</span>
                              </div>
                            </div>
                          </div>
                          <div className="field">
                            <div className="control">
                              <input
                                className={formErrors.lastName.length > 0 ? 'is_invalid input form_input' : 'input form_input'}
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={this.handleChange}
                                required
                              />
                              <div className="error-message form_error">
                                <span>{formErrors.lastName}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <input
                            className={formErrors.userName.length > 0 ? 'is_invalid input form_input' : 'input form_input'}
                            name="userName"
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={this.handleChange}
                            required
                          />
                          <div className="error-message form_error">
                            <span>{formErrors.userName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="field is-horizontal">
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <button type="submit" className={loadingMutation ? 'button edit-user-submit_button is-loading' : 'button edit-user-submit_submit_button'}>
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {mutationError && <p>Error :( Please try again</p>}
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

UserProfile.propTypes = {
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

const ConnectedUserProfile = connect(mapStateToProps)(UserProfile);
export default ConnectedUserProfile;
