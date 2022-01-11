import gql from 'graphql-tag';

export const ITEM_ADDED = gql`
subscription {
  itemCreated {
    item {
      id
      name
      description
      location
      value
      imageUrl
      quantity
    }
  }
}`;

export const itemDummy = 'dummy';
