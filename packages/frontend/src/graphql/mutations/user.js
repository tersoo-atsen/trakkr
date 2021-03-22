import gql from 'graphql-tag';

export const UPDATE_USER = gql`
mutation UpdateUser($firstName: String, $lastName: String, $userName: String, $avatarUrl: String) {
  updateUser(firstName: $firstName, lastName: $lastName, userName: $userName, avatarUrl: $avatarUrl) {
    firstName
    lastName
    userName
    avatarUrl
  }
}`;

export const userDummy = 'dummy';
