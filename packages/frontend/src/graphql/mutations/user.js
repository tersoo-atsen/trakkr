import gql from 'graphql-tag';

export const UPDATE_USER = gql`
mutation UpdateUser($firstName: String, $lastName: String, $userName: String, $avatarUrl: String) {
  updateUser(firstName: $firstName, lastName: $lastName, userName: $userName, avatarUrl: $avatarUrl) {
    id
    firstName
    lastName
    userName
    email
    avatarUrl
  }
}`;

export const userDummy = 'dummy';
