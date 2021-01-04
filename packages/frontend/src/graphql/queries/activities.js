import gql from 'graphql-tag';

export const GET_USER_ACTIVITIES = gql`
query GetUserActivities($userId: Int!, $page: Int, $perPage: Int) {
  getUserActivities(userId: $userId, page: $page, perPage: $perPage) {
    results {
      id
      name
      createdAt
      fields
      user {
        firstName
      }
      item {
        name
        value
      }
    }
    pageInfo {
      pages
      hasNextPage
      hasPrevPage
    }
  }
}`;

export const actDummy = 'dummy';
