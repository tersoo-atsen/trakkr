
export const singleUserTestCase = {
  id: 'single user',
  query: `
    query GetUser($id: Int!){
      getUser(id: $id) {
        id
        firstName
        lastName
        email
        items{
          id
          name
          description
          value
        }
      }
    }    
  `,
  variables: { id: 1 },

  // Expected result
  expected: {
    data: {
      getUser: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        items: [
          {
            id: 1,
            name: 'Statue',
            description: 'Statue of great value',
            value: 1000000,
          },
          {
            id: 2,
            name: 'Painting',
            description: 'Painting of great value',
            value: 100000,
          },
        ],
      },
    },
  },
};

export const userItemsTestCase = {
  id: 'user items',
  query: `
    query GetUserItems($userId: Int!){
      getUserItems(userId: $userId) {
        id
        description
        name
      }
    }`,

  variables: { userId: 1 },

  expected: {
    data: {
      getUserItems: [
        {
          id: 1,
          description: 'Statue of great value',
          name: 'Statue',
        },
        {
          id: 2,
          description: 'Painting of great value',
          name: 'Painting',
        },
      ],
    },
  },
};

export const userActivitiesCase = {
  id: 'user activities',
  query: `
    query getUserActivities($userId: Int!) {
      getUserActivities(userId: $userId) {
        id
        name
        user {
          id
          firstName
          lastName
          email
        }
        item {
          name
          description
          value
        }
      }
    }`,

  variables: { userId: 1 },

  expected: {
    data: {
      getUserActivities: [
        {
          id: 1,
          name: 'Add',
          user: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
          },
          item: {
            name: 'Statue',
            description: 'Statue of great value',
            value: 1000000,
          },
        },
        {
          id: 2,
          name: 'Update',
          user: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
          },
          item: {
            name: 'Statue',
            description: 'Statue of great value',
            value: 1000000,
          },
        },
      ],
    },
  },
};

export const newUser = {
  id: 'new user',
  query: `mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!){
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
      id
      lastName
      firstName
      email
    }
  }`,
  variables: {
    firstName: 'Grover', lastName: 'Johnson', email: 'grover@example.com', password: 'appUser2', userName: 'demoUser2',
  },
  expected: {
    data: {
      createUser: {
        id: 2,
        lastName: 'Johnson',
        firstName: 'Grover',
        email: 'grover@example.com',
      },
    },
  },
};
