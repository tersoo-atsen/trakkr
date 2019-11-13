import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
      id: Int!
      firstName: String!
      lastName: String!
      email: String
      password: String!
      items: [Item!]!
    }

    type Item {
      id: Int!
      name: String!
      description: String!
      imageUrl: String!
      value: Int!
      user: User!
    }

    type Activity {
      id: Int!
      name: String!
      user: User!
      item: Item!
    }

    type Query {
      getItem(id: Int!): Item
      getUser(id: Int!): User
      getUserActivities(userId: Int!): [Activity]
      getUserItems(userId: Int!): [Item]
    }

    type AuthResponse {
      token: String!
      user: User!
    }

    type Mutation {
      signUp(firstName: String!, lastName: String!, email: String!, password: String!, userName: String): AuthResponse
      signIn(login: String!, password: String!): AuthResponse
      updateUser(firstName: String, lastName: String, email: String, password: String!): [Int!]!
      createActivity(name: String!, userId: Int!, itemId: Int!): Activity!
      createItem(name: String!, description: String!, value: Int!, imageUrl: String!): Item!
      updateItem(name: String, description: String): [Int!]!
      deleteItem(id: Int!): Boolean!
    }`

export default typeDefs
