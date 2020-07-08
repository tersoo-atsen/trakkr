import gql from 'graphql-tag';

export const GET_USER_ITEMS = gql`
  query UserItems($userId: Int!){
    getUserItems(userId: $userId) {
      id
      description
      name
    }
  }
`;

export const itmDummy = 'dummy';
