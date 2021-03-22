import gql from 'graphql-tag';

export const GET_USER = gql`
query GetUser($id: Int!) {
  getUser(id: $id) {
    firstName
    lastName
    avatarUrl
    email
    userName
  }
}`;

export const GET_SIGNATURE = gql`
query getSignature($publicId: String!) {
  getSignature(publicId: $publicId) {
    signature
    timestamp
  }
}`;