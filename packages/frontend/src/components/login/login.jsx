/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import './login.scss';
import trakkrLogo from '../../assets/images/trakkr_logo.png';
import facebook from '../../assets/images/facebook.png';
import google from '../../assets/images/google.png';
import twitter from '../../assets/images/twitter.png';
import { USER_LOGIN } from '../../graphql/mutations';
import { validateFields, formValid } from '../../utils';
import authActions from '../../store/actions';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    formErrors: {
      email: '',
      password: '',
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    const { formErrors } = this.state;
    const updatedErrors = validateFields(name, value, formErrors);

    this.setState({
      formErrors: {
        ...formErrors,
        ...updatedErrors,
      },
      [name]: value,
    });
  }

  handleSubmit = async (event, loginMutation) => {
    event.preventDefault();
    const { email, password, formErrors } = this.state;
    const { dispatch, history } = this.props;

    if (formValid(this.state)) {
      const loginActionArgs = {
        loginMutation, email, password, history,
      };
      dispatch(authActions.login(loginActionArgs));
    } else {
      this.setState({
        formErrors: {
          ...formErrors,
          email: 'Email is required',
          password: 'Password is required',
        },
        email: '',
        password: '',
      });
    }
  }

  render() {
    const {
      email, password, formErrors,
    } = this.state;

    return (
      <Mutation mutation={USER_LOGIN} variables={{ login: email, password }}>
        {(loginMutation, { error }) => (
          <div className="login_page">
            <div className="login_page__content">
              <div className="login_page__logo">
                <Link to="/">
                  <img className="trakkr_logo" src={trakkrLogo} alt="trakkr logo" />
                </Link>
              </div>
              <div className="login_page__content_wrapper">
                <div className="columns">
                  <div className="column">
                    <h1 className="login_page__title_text">
                      Hello welcome back,
                      <br />
                      sign in to continue
                    </h1>
                  </div>
                  <div className="column">
                    <div className="login__page__form_error_wrapper">
                      {error && /* istanbul ignore next */(
                        <pre>
                          {error.graphQLErrors.map(/* istanbul ignore next */({ message }, idx) => (
                            <span key={idx}>{message}</span>
                          ))}
                        </pre>
                      )}
                    </div>
                    <form className="login_form" onSubmit={(e) => this.handleSubmit(e, loginMutation)} noValidate>
                      <div className="login_form_wrapper">

                        <div className="field">
                          <div className="control">
                            <input
                              className={formErrors.email.length > 0 ? 'is_invalid input form_input' : 'input form_input'}
                              name="email"
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={this.handleChange}
                              required
                            />
                            <div className="error-message form_error">
                              <span>{formErrors.email}</span>
                            </div>
                          </div>
                        </div>

                        <div className="field">
                          <div className="control">
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

                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field login_form_forgot">
                              <Link className="login_form_forgot__link" to="/">
                                Forgot password?
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field">
                              <div className="control login_form_submit">
                                <button className="button login_form_submit_button">Sign in</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field">

                              <div className="login_form_social">
                                <img className="login_form_social--facebook" src={facebook} alt="Sign in with facebook" />
                                <img className="login_form_social--twitter" src={twitter} alt="Sign in with twitter" />
                                <img className="login_form_social--google" src={google} alt="Sign in with google" />
                              </div>

                            </div>
                          </div>
                        </div>

                        <div className="field is-horizontal">
                          <div className="field-body">
                            <div className="field">
                              <div className="login_form_register">
                                <div className="login_form_register_wrapper">
                                  Don&apos;t have an account?&nbsp;
                                  <Link className="login_form_register_link" to="/signup">Sign up</Link>
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

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { loggingIn, error } = state.global;
  return {
    loading: loggingIn,
    loginError: error,
  };
}

const ConnectedLogin = connect(mapStateToProps)(Login);
export default ConnectedLogin;
