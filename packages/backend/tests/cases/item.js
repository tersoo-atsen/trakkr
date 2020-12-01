
export const singleItem = {
  id: 'single item',
  query: `
  query GetItem($id: Int!){
    getItem(id: $id){
      name
      description
      value
      imageUrl
      user{
        firstName
        lastName
        email
      }
    }
  }`,
  variables: { id: 3 },
  expected: {
    data: {
      getItem: {
        name: 'Sculpture',
        description: 'Sculpture of great value',
        value: 1020000,
        imageUrl: 'some/path/to/sculpture',
        user: {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
        },
      },
    },
  },
}

export const newItem = {
  id: 'new item',
  query: `mutation createItem($name: String!, $description: String!, $value: Int!,$quantity: Int!, $imageUrl: String!, $location: String!){
    createItem(name: $name, description: $description, value: $value, quantity: $quantity, imageUrl: $imageUrl, location: $location){
      id
      name
      description
      value,
      location,
      quantity
    }
  }`,
  variables: {
    name: 'New Item', description: 'New important item', value: 1230000, imageUrl: 'some/image/path', location: 'Kaduna', quantity: 1,
  },
  expected: {
    data: {
      createItem: {
        id: 4,
        name: 'New Item',
        description: 'New important item',
        value: 1230000,
        location: 'Kaduna',
        quantity: 1,
      },
    },
  },
};

export const deleteItem = {
  id: 'remove item',
  query: `mutation deleteItem($id: Int!) {
    deleteItem(id: $id)
  }`,
  variables: { id: 4 },
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

export const updateItem = {
  id: 'update item',
  query: `mutation updateItem($id: Int!,$name: String, $description: String){
    updateItem(id: $id, name: $name, description: $description){
      id
      name
      description
    }
  }`,
  variables: {
    id: 4,
    name: 'Item3',
    description: 'Item3 description',
  },
  expected: { data: { updateItem: { description: 'Item3 description', id: 4, name: 'Item3' } } },
}

export const updateNonexistentItem = {
  id: 'update non-existent item',
  query: `mutation updateItem($id: Int!,$name: String, $description: String){
    updateItem(id: $id, name: $name, description: $description){
      id
      name
      description
    }
  }`,
  variables: {
    id: 300,
    name: 'Item3',
    description: 'Item3 description',
  },
  expected: { data: { updateItem: { description: 'Item3 description', id: 3, name: 'Item3' } } },
}
