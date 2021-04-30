import {
  GET_USER_ACTIVITIES, GET_USER_ITEMS, GET_USER,
} from '../src/graphql/queries';
import {
  USER_LOGIN, USER_SIGNUP, UPDATE_USER, ADD_ITEM,
} from '../src/graphql/mutations';

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
export const loginErrorMocks = {
  request: {
    query: USER_LOGIN,
    variables: { email: 'jane.doe@example.com', password: 'applicationUser1' },
  },
  error: new Error('aw shucks!'),
};
export const dashboardMocks = [{
  request: {
    query: GET_USER_ACTIVITIES,
    variables: { userId: 1 },
  },
  result: {
    data: {
      getUserActivities: {
        results: [
          {
            id: 1,
            name: 'Created',
            createdAt: '2020-07-01T16:15:26.058Z',
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
            createdAt: '2020-07-05T17:51:13.068Z',
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
        pageInfo: {
          pages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
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
export const dashboardNoDataMocks = [{
  request: {
    query: GET_USER_ACTIVITIES,
    variables: { userId: 1, page: 1 },
  },
  result: {
    data: {
      getUserActivities: {
        results: [],
        pageInfo: {
          pages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
    },
  },
}];
export const itemsMocks = [{
  request: {
    query: GET_USER_ITEMS,
    variables: { userId: 1, page: 1 },
  },
  result: {
    data: {
      getUserItems: {
        results: [
          {
            id: 16,
            description: 'Statue of great value',
            imageUrl: 'https://res.cloudinary.com/tersoo/image/upload/v1607349004/trakkr/image_01.png',
            name: 'Statue6',
            value: 1000000,
            quantity: 1,
            location: 'Lagos',
            createdAt: '2020-12-03T08:51:13.000Z',
          },
          {
            id: 15,
            description: 'Statue of great value',
            imageUrl: 'https://res.cloudinary.com/tersoo/image/upload/v1607349002/trakkr/image_02.png',
            name: 'Statue5',
            value: 1000000,
            quantity: 1,
            location: 'Lagos',
            createdAt: '2020-12-03T07:51:13.000Z',
          },
          {
            id: 14,
            description: 'Statue of great value',
            imageUrl: 'https://res.cloudinary.com/tersoo/image/upload/v1607349002/trakkr/image_02.png',
            name: 'Statue4',
            value: 1000000,
            quantity: 1,
            location: 'Lagos',
            createdAt: '2020-12-02T17:51:13.000Z',
          },
          {
            id: 13,
            description: 'Statue of great value',
            imageUrl: 'https://res.cloudinary.com/tersoo/image/upload/v1607349004/trakkr/image_01.png',
            name: 'Statue3',
            value: 1000000,
            quantity: 1,
            location: 'Lagos',
            createdAt: '2020-12-02T16:51:13.000Z',
          },
          {
            id: 12,
            description: 'Statue of great value',
            imageUrl: 'https://res.cloudinary.com/tersoo/image/upload/v1607349003/trakkr/image_03.png',
            name: 'Statue2',
            value: 1000000,
            quantity: 1,
            location: 'Lagos',
            createdAt: '2020-12-02T14:51:13.000Z',
          },
        ],
        pageInfo: {
          pages: 1,
          hasNextPage: true,
          hasPrevPage: false,
        },
      },
    },
  },
}];
export const itemsErrorMocks = [{
  request: {
    query: GET_USER_ITEMS,
    variables: { userId: 1, page: 1 },
  },
  error: new Error('aw shucks!'),
}];
export const itemsNoDataMocks = [{
  request: {
    query: GET_USER_ITEMS,
    variables: { userId: 1, page: 1 },
  },
  result: {
    data: {
      getUserItems: {
        results: [],
        pageInfo: {
          pages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
    },
  },
}];

export const activityMocks = [{
  request: {
    query: GET_USER_ACTIVITIES,
    variables: { userId: 1 },
  },
  result: {
    data: {
      getUserActivities: {
        results: [
          {
            id: 1,
            name: 'Created',
            createdAt: '2020-07-05T17:51:13.068Z',
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
            name: 'Created',
            createdAt: '2020-07-05T17:51:13.068Z',
            fields: null,
            user: {
              firstName: 'John',
            },
            item: {
              name: 'Painting',
              value: 50000,
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
}];

export const activityErrorMocks = [{
  request: {
    query: GET_USER_ACTIVITIES,
    variables: { userId: 1 },
  },
  error: new Error('aw shucks!'),
}];

export const activityNoDataMocks = [{
  request: {
    query: GET_USER_ACTIVITIES,
    variables: { userId: 1 },
  },
  result: {
    data: {
      getUserActivities: {
        results: [],
        pageInfo: {
          pages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
    },
  },
}];

export const userProfileMocks = {
  request: {
    query: GET_USER,
    variables: { id: 1 },
  },
  result: {
    data: {
      getUser: {
        firstName: 'John',
        lastName: 'Doe',
        avatarUrl: 'trakkr/john-doe',
        email: 'john.doe@example.com',
        userName: 'demoUser01',
      },
    },
  },
};

export const userProfileErrorMocks = {
  request: {
    query: GET_USER,
    variables: { userId: 1 },
  },
  error: new Error('aw shucks!'),
};

export const updateUserMocks = {
  request: {
    query: UPDATE_USER,
    variables: {},
  },
  result: {
    data: {
      updateUser: {
        firstName: 'John',
        lastName: 'Doe',
        userName: 'demoUser01',
        avatarUrl: 'trakkr/john-doe',
      },
    },
  },
};

export const sigResponse = {
  data: {
    getSignature: {
      signature: 'f8f98e5b0ed4ce7cc34d971e69851bafcec42e15',
      timestamp: 1615568237,
    },
  },
};

export const userStatsMock = {
  data: {
    getUserStats: {
      itemCount: 0,
      totalQuantity: 0,
      totalValue: 0,
    },
  },
};

export const addItemMocks = [{
  request: {
    query: ADD_ITEM,
    variables: { id: 1 },
  },
  result: {
    data: {
      id: 5,
      name: 'Item5',
      description: 'description5',
      value: 1200,
      quantity: 1,
    },
  },
}];
