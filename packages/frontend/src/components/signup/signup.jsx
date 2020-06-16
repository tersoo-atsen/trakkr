/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import './signup.scss';
import trakkrLogo from '../../assets/images/trakkr_logo.png';
import { USER_SIGNUP } from '../../graphql/mutations';
import { validateFields, formValid, generateUsername } from '../../utils';
import authActions from '../../store/actions';

export class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    formErrors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    },
      () => this.validateFormFields(name, value));
  }

  validateFormFields = (name, value) => {
    const { password, confirmPassword, formErrors } = this.state;
    const updatedErrors = validateFields(name, value, formErrors, password, confirmPassword);
    this.setState({
      formErrors: { ...formErrors, ...updatedErrors },
    });
  }

  handleSubmit = async (event, signupMutation) => {
    event.preventDefault();
    const {
      email, firstName, formErrors, lastName, password,
    } = this.state;
    const { dispatch, history } = this.props;
    const userName = generateUsername(firstName, lastName);
    if (formValid(this.state)) {
      const signupActionArgs = {
        signupMutation, email, firstName, lastName, password, userName, history,
      };
      dispatch(authActions.signup(signupActionArgs));
    } else {
      this.setState({
        formErrors: {
          ...formErrors,
          email: 'Email is required',
          firstName: 'First name is required',
          lastName: 'Last name is required',
          password: 'Password is required',
          confirmPassword: 'Password confirmation is required',
        },
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
      });
    }
  }

  render() {
    const {
      email, firstName, formErrors, lastName, password, confirmPassword,
    } = this.state;

    return (
      <Mutation mutation={USER_SIGNUP} varaibales={{}}>
        {(signupMutation, { error }) => (
          <div className="signup_page">
            <div className="signup_page__content container">
              <div className="signup_page__logo">
                <Link to="/">
                  <img className="trakkr_logo" src={trakkrLogo} alt="trakkr logo" />
                </Link>
              </div>
              <div className="signup_page__content_wrapper">
                <div className="columns is-desktop">
                  <div className="column">
                    <h1 className="signup_page__title_text">
                      <span id="first-part">Create an account,</span>
                      <br />
                      <span id="second-part">Let&apos;s get started</span>
                    </h1>
                  </div>
                  <div className="column">
                    <div className="signup__page__form_error_wrapper">
                      {error && /* istanbul ignore next */(
                        <pre>
                          {error.graphQLErrors.map(/* istanbul ignore next */({ message }, idx) => (
                            <span key={idx}>{message}</span>
                          ))}
                        </pre>
                      )}
                    </div>
                    <form className="signup_form" onSubmit={(e) => this.handleSubmit(e, signupMutation)} noValidate>
                      <div className="signup_form_wrapper">
                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field">
                              <div className="control is-expanded">
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
                              <div className="control is-expanded">
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
                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field is-expanded">
                              <div className="field">
                                <div className="control is-expanded">
                                  <input
                                    className={formErrors.email.length > 0 ? 'is_invalid input form_input' : 'input form_input'}
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                  />
                                  <div className="error-message form_error">
                                    <span>{formErrors.email}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field is-expanded">
                              <div className="field">
                                <div className="control is-expanded">
                                  <input
                                    className={formErrors.password.length > 0 ? 'is_invalid input form_input' : 'input form_input'}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.handleChange}
                                    required
                                  />
                                  <div className="error-message form_error">
                                    <span>{formErrors.password}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="field is-expanded">
                              <div className="field">
                                <div className="control is-expanded">
                                  <input
                                    className="input form_input"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={this.handleChange}
                                    required
                                  />
                                  <div className="error-message form_error">
                                    <span>{formErrors.confirmPassword}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field">
                              <div className="control signup_form_submit">
                                <button className="button signup_form_submit_button">
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field">
                              <div className="signup_form_login">
                                <div className="signup_form_login_wrapper">
                                  Already have an account?&nbsp;
                                  <Link className="signup_form_login_link" to="/login">
                                    Sign in
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
Signup.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  const { registering, error } = state.register;
  return {
    loading: registering,
    sigupError: error,
  };
};
const ConnectedSignup = connect(mapStateToProps)(Signup);
export default ConnectedSignup;
