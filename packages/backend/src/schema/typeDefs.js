import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar Date

    type User {
      id: Int!
      firstName: String!
      lastName: String!
      userName: String
      email: String
      avatarUrl: String!
      password: String!
      createdAt: Date!
      items: [Item!]!
    }

    type Item {
      id: Int!
      name: String!
      description: String!
      location: String!
      imageUrl: String!
      value: Int!
      quantity: Int!
      createdAt: Date!
    }

    type Activity {
      id: Int!
      name: String!
      user: User!
      item: Item
      fields: [String]
      createdAt: Date!
    }

    type Query {
      getItem(id: Int!): Item
      getUser(id: Int!): User
      getUserActivities(userId: Int!, page: Int, perPage: Int): Activities
      getUserItems(userId: Int!, page: Int, perPage: Int): Items
      searchItems(search: String): [Item]!
      getSignature(publicId: String!): Signature
      getUserStats(id: Int!): Stats
    }

    type AuthResponse {
      token: String!
      user: User!
    }

    type Activities {
      results: [Activity!]!
      pageInfo: PageInfo
    }

    type Items {
      results: [Item!]!
      pageInfo: PageInfo
    }
    
    type PageInfo {
      pages: Int! 
      hasNextPage: Boolean!
      hasPrevPage: Boolean!
    }

    type Signature {
      signature: String!
      timestamp: Int!
    }
    
    type Stats {
      itemCount: Int!
      totalQuantity: Int!
      totalValue: Int!
    }

    type Mutation {
      signUp(firstName: String!, lastName: String!, email: String!, password: String!, userName: String): AuthResponse
      signIn(login: String!, password: String!): AuthResponse
      updateUser(firstName: String, lastName: String, userName: String, avatarUrl: String): User
      createItem(id: Int!, name: String!, description: String!, value: Int!, imageUrl: String!, location: String!, quantity: Int!, imageUrl: String): Item!
      updateItem(id: Int!, name: String, description: String, value: Int, quantity: Int, location: String, imageUrl: String): Item
      deleteItem(id: Int!): Boolean!
    }
    
    type Subscription {
      itemCreated: ItemCreated!
    }

    type ItemCreated {
      item: Item!
    }
  `;

export default typeDefs
