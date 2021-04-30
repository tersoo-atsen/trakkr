import gql from 'graphql-tag';

export const ADD_ITEM = gql`
  mutation CreateItem($id: Int!, $name: String!, $description: String!, $value: Int!, $imageUrl: String!, $location: String!, $quantity: Int!) {
    createItem(id: $id, name: $name, description: $description, value: $value, quantity: $quantity, imageUrl: $imageUrl, location: $location) {
      id
      name
      description
      value
      quantity
    }
  }`;

export const itemDummy = 'dummy';
