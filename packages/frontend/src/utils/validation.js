export const emailRegExp = RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

export const formValid = ({ formErrors, ...rest }) => {
  let isValid = false;

  Object.values(formErrors).forEach((val) => {
    if (val.length < 1) {
      isValid = true;
    }
  });

  Object.values(rest).forEach((val) => {
    if (!val) {
      isValid = false;
    } else {
      isValid = true;
    }
  });

  return isValid;
};

export const capitalizeAllWords = (sentence) => sentence.split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

export const validateFields = (name, value, formErrors) => {
  let updatedFormErrors = { ...formErrors };

  if (!value) {
    updatedFormErrors = {
      [name]: `${capitalizeAllWords(name)} is required`,
    };
    return updatedFormErrors;
  }

  switch (name) {
    case 'email':
      updatedFormErrors.email = value && emailRegExp.test(value)
        ? ''
        : 'Email address is invalid';
      break;
    case 'password':
      updatedFormErrors.password = value && value.length < 6 ? 'Password should not less than 6 characters' : '';
      break;
    default:
      break;
  }

  return updatedFormErrors;
};
