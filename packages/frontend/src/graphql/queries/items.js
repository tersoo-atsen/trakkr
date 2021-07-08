import gql from 'graphql-tag';

export const GET_USER_ITEMS = gql`
query GetUserItems($userId: Int!, $page: Int, $perPage: Int) {
  getUserItems(userId: $userId, page: $page, perPage: $perPage) {
      results{
          id
          description
          imageUrl
          name
          value
          quantity
          location
          createdAt 
      }
      pageInfo {
        pages
        hasNextPage
        hasPrevPage
    }
  }
}`;

export const GET_ITEM = gql`
  query GetItem($id: Int!) {
    getItem(id: $id) {
      id
      name
      description
      value
      quantity
      imageUrl
      location
    }
  }`;

export const itemDummy = 'dummy';
