import gql from 'graphql-tag';

export const GET_ALL_ITEMS = gql`
  query UserItems($userId: Int!){
    getUserItems(userId: $userId) {
      id
      description
      name
    }
  }
`;

export const dummy = {};
