
export const itemCases = {
  id: 'single item',
  query: `
  query GetItem($id: Int!){
    getItem(id: $id){
      id
      name
      description
      value
      imageUrl
      user{
        id
        firstName
        lastName
        email
      }
    }
  }`,
  variables: { id: 2 },
  expected: {
    data: {
      getItem: {
        id: 2,
        name: 'Painting',
        description: 'Painting of great value',
        value: 100000,
        imageUrl: 'some/path/to/image',
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
      },
    },
  },
}


export const newItem = {
  id: 'new item',
  query: `mutation createItem($userId: Int!, $name: String!, $description: String!, $value: Int!){
    createItem(userId: $userId, name: $name, description: $description, value: $value){
      id
      name
      description
      value
    }
  }`,
  variables: {
    userId: 1, name: 'New Item', description: 'New important item', value: 1230000,
  },
  expected: {
    data: {
      createItem: {
        id: 3,
        name: 'New Item',
        description: 'New important item',
        value: 1230000,
      },
    },
  },
};

export const deleteItem = {
  id: 'remove item',
  query: `mutation deleteItem($id: Int!) {
    deleteItem(id: $id)
  }`,
  variables: { id: 3 },
  expected: {
    data: {
      deleteItem: true,
    },
  },
}
