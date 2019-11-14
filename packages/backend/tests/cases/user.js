
export const singleUser = {
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
  id: 'user items',
  query: `
    query GetUserItems($userId: Int!){
      getUserItems(userId: $userId) {
        id
        description
        name
      }
    }`,

  variables: { userId: 2 },

  expected: {
    data: {
      getUserItems: [
        {
          id: 3,
          description: 'Sculpture of great value',
          name: 'Sculpture',
        },
      ],
    },
  },
};

export const userActivities = {
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

export const signUp = {
  id: 'user sign up',
  query: `mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!, $userName: String){
    signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password, userName: $userName){
      user {
        id
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
          id: 3,
          lastName: 'Johnson',
        },
      },
    },
  },
};

export const signIn = {
  id: 'user sign in',
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
  id: 'user sign in',
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
  id: 'user sign in',
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
  id: 'update user',
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
