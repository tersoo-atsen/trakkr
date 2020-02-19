import gql from 'graphql-tag';

export const USER_LOGIN = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
      user{
        firstName
        lastName
      }
    }
  }
`;

export const USER_SIGN_UP = gql`
  mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!, $userName: String) {
    signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password, userName: $userName) {
      user {
        id
        lastName
        firstName
        email
      }
      token
    }
  }
`;
