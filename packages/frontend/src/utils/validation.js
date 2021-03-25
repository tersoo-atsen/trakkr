import { capitalizeAllWords } from './helpers';

export const emailRegExp = RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
export const formValid = ({ formErrors }) => {
  let isValid = false;
  Object.values(formErrors).forEach((val) => {
    if (val.length < 1) {
      isValid = true;
    }
  });
  return isValid;
};

export const validateFields = (name, value, formErrors, password, confirmPassword) => {
  let updatedFormErrors = { ...formErrors };
  if (!value) {
    switch (name) {
      case 'firstName':
        updatedFormErrors = {
          firstName: 'First name is required',
        };
        break;
      case 'lastName':
        updatedFormErrors = {
          lastName: 'Last name is required',
        };
        break;
      case 'userName':
        updatedFormErrors = {
          userName: 'Username is required',
        };
        break;
      default:
        updatedFormErrors = {
          [name]: `${capitalizeAllWords(name)} is required`,
        };
        break;
    }
    return updatedFormErrors;
  }

  switch (name) {
    case 'email':
      updatedFormErrors.email = value && emailRegExp.test(value)
        ? ''
        : 'Email address is invalid';
      break;
    case 'password':
      updatedFormErrors.password = value && value.length < 6 ? 'Password should be greater than 6 characters' : '';
      break;
    case 'confirmPassword':
      updatedFormErrors.confirmPassword = (password && confirmPassword) && password !== confirmPassword ? 'Password and confirmation do not match' : '';
      break;
    case 'firstName':
      updatedFormErrors.firstName = value && value.length < 3 ? 'First name should be 3 characters or more' : '';
      break;
    case 'lastName':
      updatedFormErrors.lastName = value && value.length < 3 ? 'Last name should not less than 3 characters' : '';
      break;
    default:
      break;
  }
  return updatedFormErrors;
};
