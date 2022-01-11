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

export const EDIT_ITEM = gql`
  mutation UpdateItem($id: Int!, $name: String!, $description: String!, $value: Int!, $imageUrl: String!, $location: String!, $quantity: Int!) {
    updateItem(id: $id, name: $name, description: $description, value: $value, quantity: $quantity, imageUrl: $imageUrl, location: $location) {
      id
      name
      description
      value
      quantity
      imageUrl
      location
    }
  }`;

export const DELETE_ITEM = gql`
  mutation RemoveItem($id: Int!) {
    deleteItem(id: $id)
  }`;
