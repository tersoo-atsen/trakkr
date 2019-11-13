
export const singleItem = {
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
  query: `mutation createItem($name: String!, $description: String!, $value: Int!, $imageUrl: String!){
    createItem(name: $name, description: $description, value: $value, imageUrl: $imageUrl){
      id
      name
      description
      value
    }
  }`,
  variables: {
    name: 'New Item', description: 'New important item', value: 1230000, imageUrl: 'some/image/path',
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

export const deleteNonexistentItem = {
  id: 'remove non-existent item',
  query: `mutation deleteItem($id: Int!) {
    deleteItem(id: $id)
  }`,
  variables: { id: 30 },
}
