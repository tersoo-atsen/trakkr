import { GET_USER_ACTIVITIES } from '../src/graphql/queries';
import { USER_LOGIN, USER_SIGNUP } from '../src/graphql/mutations';

export const testToken = 'add get token method';
export const signup = {
  request: {
    query: USER_SIGNUP,
    variables: {
      email: 'jonathan@example.com', firstName: 'jonathan', lastName: 'doe', password: 'Pasword1234', userName: 'jonathanDoe',
    },
  },
  result: {
    data: {
      signUp: {
        token: testToken,
        user: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    },
  },
};
export const login = {
  request: {
    query: USER_LOGIN,
    variables: { email: 'jane.doe@example.com', password: 'applicationUser1' },
  },
  result: {
    data: {
      signIn: {
        token: testToken,
        user: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    },
  },
};
export const dashboardMocks = [{
  request: {
    query: GET_USER_ACTIVITIES,
    variables: { userId: 1 },
  },
  result: {
    data: {
      getUserActivities: [
        {
          id: 1,
          name: 'Created',
          updatedAt: '2020-07-01T16:15:26.058Z',
          fields: null,
          user: {
            firstName: 'John',
          },
          item: {
            name: 'Statue',
            value: 1000000,
          },
        },
        {
          id: 2,
          name: 'Updated',
          updatedAt: '2020-07-05T17:51:13.068Z',
          fields: ['location', 'value'],
          user: {
            firstName: 'John',
          },
          item: {
            name: 'Painting',
            value: 50000,
          },
        },
      ],
    },
  },
}];
export const dashboardErrorMocks = [{
  request: {
    query: GET_USER_ACTIVITIES,
    variables: { userId: 1 },
  },
  error: new Error('aw shucks!'),
}];
export const dashboardLongResponseMocks = [{
  request: {
    query: GET_USER_ACTIVITIES,
    variables: { userId: 1 },
  },
  result: {
    data: {
      getUserActivities: [
        {
          id: 1,
          name: 'Created',
          updatedAt: '2020-07-01T16:15:26.058Z',
          fields: null,
          user: {
            firstName: 'John',
          },
          item: {
            name: 'Statue',
            value: 1000000,
          },
        },
        {
          id: 2,
          name: 'Updated',
          updatedAt: '2020-07-05T17:51:13.068Z',
          fields: ['location', 'value'],
          user: {
            firstName: 'John',
          },
          item: {
            name: 'Painting',
            value: 50000,
          },
        },
        {
          id: 3,
          name: 'Created',
          updatedAt: '2020-07-01T16:15:26.058Z',
          fields: null,
          user: {
            firstName: 'John',
          },
          item: {
            name: 'Statue',
            value: 1000000,
          },
        },
        {
          id: 4,
          name: 'Updated',
          updatedAt: '2020-07-05T17:51:13.068Z',
          fields: ['location', 'value'],
          user: {
            firstName: 'John',
          },
          item: {
            name: 'Painting',
            value: 50000,
          },
        },
        {
          id: 5,
          name: 'Updated',
          updatedAt: '2020-07-05T17:51:13.068Z',
          fields: ['location', 'value'],
          user: {
            firstName: 'John',
          },
          item: {
            name: 'Painting',
            value: 50000,
          },
        },
        {
          id: 6,
          name: 'Updated',
          updatedAt: '2020-07-05T17:51:13.068Z',
          fields: ['location', 'value'],
          user: {
            firstName: 'John',
          },
          item: {
            name: 'Painting',
            value: 50000,
          },
        },
      ],
    },
  },
}];
export const dashboardNoDataMocks = [{
  request: {
    query: GET_USER_ACTIVITIES,
    variables: { userId: 1 },
  },
  result: {
    data: {
      getUserActivities: [],
    },
  },
}];
