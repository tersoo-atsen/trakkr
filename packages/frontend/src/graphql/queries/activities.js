import gql from 'graphql-tag';

export const GET_USER_ACTIVITIES = gql`
  query GetUserActivities($userId: Int!) {
    getUserActivities(userId: $userId) {
      id
      name
      updatedAt
      fields
      user {
        firstName
      }
      item {
        name
        value
      }
    }
  }
`;

export const actDummy = 'dummy';
