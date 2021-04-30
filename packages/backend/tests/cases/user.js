export const today = new Date().toISOString();
export const invalidDate = 242345215;
export const singleUser = {
  id: 'Should return single user',
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
  variables: { id: 2 },
  expected: {
    data: {
      getUser: {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        items: [
          {
            id: 3,
            name: 'Sculpture',
            description: 'Sculpture of great value',
            value: 1020000,
          },
        ],
      },
    },
  },
};

export const userItems = {
  id: 'Should return user items',
  query: `query GetUserItems($userId: Int!, $page: Int, $perPage: Int) {
    getUserItems(userId: $userId, page: $page, perPage: $perPage) {
      results {
        id
        description
        imageUrl
        name
      }
      pageInfo {
        pages
        hasNextPage
        hasPrevPage
      }
    }
  }`,
  variables: { userId: 2 },
  expected: {
    data: {
      getUserItems: {
        results: [
          {
            id: 3,
            description: 'Sculpture of great value',
            imageUrl: 'trakkr/statue02',
            name: 'Sculpture',
          },
        ],
        pageInfo: {
          pages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
    },
  },
};

export const userItemsInvalidDate = {
  id: 'Should not return user items with invalid date',
  query: `
    query GetUserItems($userId: Int!){
      getUserItems(userId: $userId) {
        id
        description
        name
        createdAt
      }
    }`,

  variables: { userId: 2 },

  expected: {
    data: {
      getUserItems: {
        results: [
          {
            id: 3,
            description: 'Sculpture of great value',
            name: 'Sculpture',
            createdAt: today,
          },
        ],
        pageInfo: {
          pages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
    },
  },
};

export const userActivities = {
  id: 'Should return user activities',
  query: `
  query GetUserActivities($userId: Int!, $page: Int, $perPage: Int) {
    getUserActivities(userId: $userId, page: $page, perPage: $perPage) {
      results {
        id
        name
        createdAt
        user {
          id
          firstName
          lastName
          email
        }
        item {
          name
          value
          description
        }
      }
      pageInfo {
        pages
        hasNextPage
        hasPrevPage
      }
    }
  }`,

  variables: { userId: 2 },

  expected: {
    data: {
      getUserActivities: {
        results: [
          {
            id: 3,
            name: 'Created',
            createdAt: today,
            user: {
              id: 2,
              firstName: 'Jane',
              lastName: 'Doe',
              email: 'jane.doe@example.com',
            },
            item: {
              name: 'Sculpture',
              description: 'Sculpture of great value',
              value: 1020000,
            },
          },
        ],
        pageInfo: {
          pages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
    },
  },
};

export const signUp = {
  id: 'Should return complete user sign up',
  query: `mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!, $userName: String){
    signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password, userName: $userName){
      user {
        lastName
        firstName
        email
      }
      token
    }
  }`,
  variables: {
    firstName: 'Grover', lastName: 'Johnson', email: 'grover@example.com', password: 'appUser2', userName: 'demoUser2',
  },
  expected: {
    data: {
      signUp: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzMwMzk4NDUsImV4cCI6MTU3MzA0MTY0NX0.1B1ryU93orWpxXM3aK1farIABGEyZ5DiYdoE3ifgL1c',
        user: {
          email: 'grover@example.com',
          firstName: 'Grover',
          lastName: 'Johnson',
        },
      },
    },
  },
};

export const signIn = {
  id: 'Should return complete user sign in',
  query: `mutation signIn($login: String!, $password: String!){
    signIn(login: $login, password: $password){
      token
      user {
        id
        lastName
        firstName
        email
      }
    }
  }`,
  variables: {
    login: 'john.doe@example.com', password: 'applicationUser1',
  },
  expected: {
    data: {
      signIn: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzMwMzk4NDUsImV4cCI6MTU3MzA0MTY0NX0.1B1ryU93orWpxXM3aK1farIABGEyZ5DiYdoE3ifgL1c',
        user: {
          email: 'john.doe@example.com',
          firstName: 'John',
          id: 1,
          lastName: 'Doe',
        },
      },
    },
  },
};

export const signInUserNotFound = {
  id: 'Should not complete sign in if user is not found',
  query: `mutation signIn($login: String!, $password: String!){
    signIn(login: $login, password: $password){
      token
      user {
        id
        lastName
        firstName
        email
      }
    }
  }`,
  variables: {
    login: 'grover123@example.com', password: 'appUser2',
  },
};

export const signInInvalidPassword = {
  id: 'Should not complete sign in if user password is incorrect',
  query: `mutation signIn($login: String!, $password: String!){
    signIn(login: $login, password: $password){
      token
      user {
        id
        lastName
        firstName
        email
      }
    }
  }`,
  variables: {
    login: 'grover@example.com', password: '',
  },
}

export const updateUser = {
  id: 'Should complete user update',
  query: `mutation updateUser($firstName: String, $lastName: String, $userName: String){
    updateUser(firstName: $firstName, lastName: $lastName, userName: $userName){
      id
      firstName
      lastName
      userName
    }
  }`,
  variables: {
    firstName: 'James',
    lastName: 'Boring',
  },

  expected: {
    data: {
      updateUser: {
        id: 1,
        firstName: 'James',
        lastName: 'Boring',
        userName: 'demoUser1',
      },
    },
  },
}

export const userStats = {
  id: 'Should get user stats',
  query: `query getUserStats($id: Int!) {
    getUserStats(id: $id) {
      itemCount
      totalQuantity
      totalValue
    }
  }`,
  variables: {
    id: 1,
  },
  expected: {
    data: {
      getUserStats: {
        itemCount: 2,
        totalQuantity: 3,
        totalValue: 1050000,
      },
    },
  },
}
